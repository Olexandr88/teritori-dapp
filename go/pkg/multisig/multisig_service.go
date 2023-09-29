package multisig

import (
	"bytes"
	"context"
	"crypto/ed25519"
	srand "crypto/rand"
	"encoding/base64"
	"encoding/json"
	"time"

	"github.com/TERITORI/teritori-dapp/go/pkg/multisigpb"
	"github.com/cosmos/cosmos-sdk/codec/legacy"
	"github.com/cosmos/cosmos-sdk/crypto/keys/multisig"
	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/pkg/errors"
	"go.uber.org/zap"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
	"gorm.io/datatypes"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const universalBech32Prefix = "user"

type multisigService struct {
	multisigpb.UnimplementedMultisigServiceServer

	publicKey  ed25519.PublicKey
	privateKey ed25519.PrivateKey
	db         *gorm.DB
	opts       *MultisigServiceOpts
}

type MultisigServiceOpts struct {
	TokenDuration     time.Duration
	ChallengeDuration time.Duration
	DBPath            string
	Logger            *zap.Logger
}

func (opts *MultisigServiceOpts) applyDefaults() {
	if opts.Logger == nil {
		opts.Logger = zap.NewNop()
	}

	if opts.TokenDuration == 0 {
		opts.TokenDuration = time.Hour
	}

	if opts.ChallengeDuration == 0 {
		opts.ChallengeDuration = 5 * time.Minute
	}

	if opts.DBPath == "" {
		opts.DBPath = "multisig.db"
	}
}

func NewMultisigService(opts MultisigServiceOpts) (multisigpb.MultisigServiceServer, error) {
	opts.applyDefaults()

	publicKey, privateKey, err := ed25519.GenerateKey(srand.Reader)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate key")
	}

	db, err := gorm.Open(sqlite.Open(opts.DBPath), &gorm.Config{})
	if err != nil {
		return nil, errors.Wrap(err, "failed to open db")
	}
	if err := db.AutoMigrate(&Multisig{}, &UserMultisig{}, &Transaction{}, &Signature{}); err != nil {
		return nil, errors.Wrap(err, "failed to migrate db")
	}

	return &multisigService{
		publicKey:  publicKey,
		privateKey: privateKey,
		db:         db,
		opts:       &opts,
	}, nil
}

// Read
func (s *multisigService) Multisigs(_ context.Context, req *multisigpb.MultisigsRequest) (*multisigpb.MultisigsResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	var multisigs []*multisigpb.Multisig

	if err := s.db.Transaction(func(tx *gorm.DB) error {
		limit := int(req.Limit)
		if limit == 0 {
			limit = 10
		}

		query := tx
		if req.ChainId != "" {
			query = query.Where("multisig_chain_id = ?", req.ChainId)
		}
		if req.GetJoinState() != multisigpb.JoinState_JOIN_STATE_UNSPECIFIED {
			query = query.Where("joined = ?", req.GetJoinState() == multisigpb.JoinState_JOIN_STATE_IN)
		}
		startAfterString := req.GetStartAfter()
		if startAfterString != "" {
			startAfter, err := parseTime(startAfterString)
			if err != nil {
				return errors.Wrap(err, "failed to parse start after")
			}
			query = query.Where("created_at < ?", startAfter)
		}
		var userMultisigs []UserMultisig
		if err := query.
			Where("user_address = ?", userAddress).
			Order("created_at DESC").
			Limit(limit).
			Find(&userMultisigs).Error; err != nil {
			return errors.Wrap(err, "failed to find user multisigs")
		}

		for _, ms := range userMultisigs {
			multisigs = append(multisigs, &multisigpb.Multisig{
				ChainId:   ms.MultisigChainID,
				Address:   ms.MultisigAddress,
				CreatedAt: formatTime(ms.CreatedAt),
				Joined:    ms.Joined,
				Name:      ms.Name,
			})
		}

		return nil
	}); err != nil {
		return nil, err
	}

	return &multisigpb.MultisigsResponse{Multisigs: multisigs}, nil
}

func (s *multisigService) MultisigInfo(_ context.Context, req *multisigpb.MultisigInfoRequest) (*multisigpb.MultisigInfoResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	var userMultisig UserMultisig
	if err := s.db.First(&userMultisig, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", req.GetChainId(), userAddress, req.GetMultisigAddress()).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrNotFound
		}
		return nil, errors.Wrap(err, "failed to find user multisig")
	}

	var multisig Multisig
	if err := s.db.Preload("Users").First(&multisig, "chain_id = ? AND address = ?", req.GetChainId(), req.GetMultisigAddress()).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("multisig not found, this should never happen")
		}
		return nil, errors.Wrap(err, "failed to find multisig")
	}

	multisigPrefix, _, err := bech32.DecodeAndConvert(multisig.Address)
	if err != nil {
		return nil, errors.Wrap(err, "failed to decode multisig address")
	}
	usersAddresses := make([]string, len(multisig.Users))
	for i, user := range multisig.Users {
		_, userAddressBytes, err := bech32.DecodeAndConvert(user.UserAddress)
		if err != nil {
			return nil, errors.Wrap(err, "failed to decode user address")
		}
		chainUserAddress, err := bech32.ConvertAndEncode(multisigPrefix, userAddressBytes)
		if err != nil {
			return nil, errors.Wrap(err, "failed to encode user address")
		}
		usersAddresses[i] = chainUserAddress
	}

	return &multisigpb.MultisigInfoResponse{
		Multisig: &multisigpb.Multisig{
			ChainId:        multisig.ChainID,
			Address:        multisig.Address,
			CreatedAt:      formatTime(multisig.CreatedAt),
			Joined:         userMultisig.Joined,
			Name:           userMultisig.Name,
			PubkeyJson:     multisig.PubKeyJSON,
			UsersAddresses: usersAddresses,
			Threshold:      multisig.Threshold,
		},
	}, nil
}

func (s *multisigService) Transactions(_ context.Context, req *multisigpb.TransactionsRequest) (*multisigpb.TransactionsResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	// we can't use .Joins( on signature because it does not expect a slice
	query := transactionsQuery(s.db, userAddress, req.ChainId, req.MultisigAddress, req.ExecutionState, req.Types)

	// handle cursor
	startAfterString := req.GetStartAfter()
	if startAfterString != "" {
		startAfter, err := parseTime(startAfterString)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse start after")
		}
		query = query.Where("transactions.created_at < ?", startAfter)
	}

	var dbTransactions []Transaction
	if err := query.
		Order("transactions.created_at DESC").
		Limit(int(req.Limit)).
		Find(&dbTransactions).Error; err != nil {
		return nil, errors.Wrap(err, "failed to find user multisigs")
	}

	transactions := make([]*multisigpb.Transaction, len(dbTransactions))
	for i, tx := range dbTransactions {
		// FIXME: log error and pass empty user address maybe
		multisigPrefix, _, err := bech32.DecodeAndConvert(tx.MultisigAddress)
		if err != nil {
			return nil, errors.Wrap(err, "failed to decode multisig address")
		}
		_, creatorAddressBytes, err := bech32.DecodeAndConvert(tx.CreatorAddress)
		if err != nil {
			return nil, errors.Wrap(err, "failed to decode user address")
		}
		chainCreatorAddress, err := bech32.ConvertAndEncode(multisigPrefix, creatorAddressBytes)
		if err != nil {
			return nil, errors.Wrap(err, "failed to encode user address")
		}
		finalHash := ""
		if tx.FinalHash != nil {
			finalHash = *tx.FinalHash
		}
		transactions[i] = &multisigpb.Transaction{
			ChainId:            tx.MultisigChainID,
			MultisigAddress:    tx.MultisigAddress,
			AccountNumber:      tx.AccountNumber,
			Sequence:           tx.Sequence,
			MsgsJson:           tx.MsgsJSON.String(),
			FeeJson:            tx.FeeJSON,
			FinalHash:          finalHash,
			CreatedAt:          formatTime(tx.CreatedAt),
			CreatorAddress:     chainCreatorAddress,
			Threshold:          tx.Multisig.Threshold,
			MembersCount:       tx.Multisig.MembersCount,
			MultisigPubkeyJson: tx.Multisig.PubKeyJSON,
			Id:                 uint32(tx.ID),
		}
		for _, sig := range tx.Signatures {
			_, signerAddressBytes, err := bech32.DecodeAndConvert(sig.UserAddress)
			if err != nil {
				return nil, errors.Wrap(err, "failed to decode user address")
			}
			chainSignerAddress, err := bech32.ConvertAndEncode(multisigPrefix, signerAddressBytes)
			if err != nil {
				return nil, errors.Wrap(err, "failed to encode user address")
			}
			transactions[i].Signatures = append(transactions[i].Signatures, &multisigpb.Signature{
				UserAddress: chainSignerAddress,
				Value:       sig.Signature,
				BodyBytes:   sig.BodyBytes,
			})
		}
	}
	return &multisigpb.TransactionsResponse{Transactions: transactions}, nil
}

type TransactionsCount struct {
	Type     string
	Count    uint32
	Executed bool
}

func (s *multisigService) TransactionsCounts(_ context.Context, req *multisigpb.TransactionsCountsRequest) (*multisigpb.TransactionsCountsResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	var countsByType []TransactionsCount
	query := transactionsQuery(s.db, userAddress, req.ChainId, req.MultisigAddress, multisigpb.ExecutionState_EXECUTION_STATE_UNSPECIFIED, nil)
	if err := query.
		Select("count(type) as Count, type as Type, final_hash IS NOT NULL as Executed").
		Group("Type, Executed").
		Scan(&countsByType).
		Error; err != nil {
		return nil, errors.Wrap(err, "failed to count transactions")
	}

	all := multisigpb.TransactionsCount{}
	byType := make(map[string]*multisigpb.TransactionsCount)
	for _, count := range countsByType {
		if byType[count.Type] == nil {
			byType[count.Type] = &multisigpb.TransactionsCount{Type: count.Type}
		}
		if count.Executed {
			byType[count.Type].Executed += count.Count
			all.Executed += count.Count
		} else {
			byType[count.Type].Pending += count.Count
			all.Pending += count.Count
		}
	}
	all.Total = all.Executed + all.Pending
	byTypeSlice := make([]*multisigpb.TransactionsCount, len(byType))
	i := 0
	for _, count := range byType {
		count.Total = count.Executed + count.Pending
		byTypeSlice[i] = count
		i++
	}

	return &multisigpb.TransactionsCountsResponse{
		All:    &all,
		ByType: byTypeSlice,
	}, nil
}

// Write
func (s *multisigService) CreateOrJoinMultisig(_ context.Context, req *multisigpb.CreateOrJoinMultisigRequest) (*multisigpb.CreateOrJoinMultisigResponse, error) {
	var created, joined bool
	multisigAddress := ""

	if err := s.db.Transaction(func(tx *gorm.DB) error {
		userAddress, err := s.authenticate(tx, req.GetAuthToken())
		if err != nil {
			return errors.Wrap(err, "failed to authenticate")
		}

		name := req.GetName()
		chainID := req.GetChainId()
		pubkeyJSON := req.GetMultisigPubkeyJson()

		var ms multisig.LegacyAminoPubKey
		if err := legacy.Cdc.UnmarshalJSON([]byte(pubkeyJSON), &ms); err != nil {
			return errors.Wrap(err, "failed to unmarshal multisig pubkey json")
		}
		multisigAddress, err = bech32.ConvertAndEncode(req.GetBech32Prefix(), ms.Address())
		if err != nil {
			return errors.Wrap(err, "failed to encode multisig address")
		}

		multisigPubKeys := ms.GetPubKeys()
		if int(ms.Threshold) > len(multisigPubKeys) || ms.Threshold == 0 {
			return errors.New("invalid threshold")
		}

		_, userAddressBytes, err := bech32.DecodeAndConvert(userAddress)
		if err != nil {
			return errors.Wrap(err, "failed to decode user address, this should never happen")
		}
		found := false
		for _, pk := range multisigPubKeys {
			pkType := pk.Type()
			if pkType != "secp256k1" {
				return errors.New("invalid member pubkey type '" + pkType + "'")
			}
			memberAddressBytes := pk.Address().Bytes()
			if bytes.Equal(memberAddressBytes, userAddressBytes) {
				found = true
			}
		}
		if !found {
			return errors.New("user address is not a member of the multisig")
		}

		now := time.Now().UTC()

		var multisig Multisig
		if err := tx.First(&multisig, "chain_id = ? AND address = ?", chainID, multisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				multisig = Multisig{
					ChainID:      chainID,
					Address:      multisigAddress,
					PubKeyJSON:   pubkeyJSON,
					CreatedAt:    now,
					Threshold:    ms.Threshold,
					MembersCount: uint32(len(multisigPubKeys)),
				}
				if err := tx.Save(&multisig).Error; err != nil {
					return errors.Wrap(err, "failed to save multisig")
				}
				for _, pk := range multisigPubKeys {
					addrBytes := pk.Address().Bytes()
					userAddress, err := bech32.ConvertAndEncode(universalBech32Prefix, addrBytes)
					if err != nil {
						return errors.Wrap(err, "failed to encode user address")
					}
					var userMultisig UserMultisig
					if err := tx.First(&userMultisig, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", chainID, userAddress, multisigAddress).Error; err != nil {
						if errors.Is(err, gorm.ErrRecordNotFound) {
							userMultisig = UserMultisig{
								MultisigChainID: chainID,
								UserAddress:     userAddress,
								MultisigAddress: multisigAddress,
								CreatedAt:       now,
								Joined:          false,
							}
							if err := tx.Save(&userMultisig).Error; err != nil {
								return errors.Wrap(err, "failed to save user multisig")
							}
						} else {
							return errors.Wrap(err, "failed to find user multisig")
						}
					}
				}
				created = true
			} else {
				return errors.Wrap(err, "failed to find multisig")
			}
		}

		var userMultisig UserMultisig
		if err := tx.First(&userMultisig, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", chainID, userAddress, multisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				userMultisig = UserMultisig{
					MultisigChainID: chainID,
					UserAddress:     userAddress,
					MultisigAddress: multisigAddress,
					CreatedAt:       now,
					Joined:          true,
					Name:            name,
				}
				if err := tx.Save(&userMultisig).Error; err != nil {
					return errors.Wrap(err, "failed to save user multisig")
				}
				joined = true
			} else {
				return errors.Wrap(err, "failed to find user multisig")
			}
			return nil
		}

		if userMultisig.Name == name && userMultisig.Joined {
			return nil
		}
		if !userMultisig.Joined {
			joined = true
		}
		userMultisig.Name = name
		userMultisig.Joined = true
		if err := tx.Save(&userMultisig).Error; err != nil {
			return errors.Wrap(err, "failed to update user multisig")
		}

		return nil
	}); err != nil {
		return nil, err
	}

	return &multisigpb.CreateOrJoinMultisigResponse{Created: created, Joined: joined, MultisigAddress: multisigAddress}, nil
}

func (s *multisigService) LeaveMultisig(_ context.Context, req *multisigpb.LeaveMultisigRequest) (*multisigpb.LeaveMultisigResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	left := false
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		chainID := req.GetChainId()
		multisigAddress := req.GetMultisigAddress()

		var userMultisig UserMultisig
		if err := tx.First(userMultisig, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", chainID, userAddress, multisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("user is not a member of the multisig")
			}
			return errors.Wrap(err, "failed to find user multisig")
		}

		if userMultisig.Joined {
			if err := tx.Model(&UserMultisig{}).
				Where("multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", chainID, userAddress, multisigAddress).
				UpdateColumn("joined", false).
				Error; err != nil {
				return errors.Wrap(err, "failed to update user multisig")
			}
			left = true
		}

		return nil
	}); err != nil {
		return nil, err
	}

	return &multisigpb.LeaveMultisigResponse{Left: left}, nil
}

type CosmosMessage struct {
	TypeURL string `json:"typeUrl"`
}

func (s *multisigService) CreateTransaction(_ context.Context, req *multisigpb.CreateTransactionRequest) (*multisigpb.CreateTransactionResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	var msgs []CosmosMessage
	if err := json.Unmarshal([]byte(req.GetMsgsJson()), &msgs); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal msgs json")
	}
	kind := "multiple"
	if len(msgs) == 0 {
		kind = "empty"
	} else if len(msgs) == 1 {
		kind = msgs[0].TypeURL
	}

	if err := s.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.First(&UserMultisig{}, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", req.ChainId, userAddress, req.MultisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("user is not a member of the multisig")
			}
			return errors.Wrap(err, "failed to find user multisig")
		}

		sequence := req.GetSequence()
		var lastSequenceTx Transaction
		if err := tx.Model(&Transaction{}).Order("sequence DESC").First(&lastSequenceTx, "multisig_chain_id = ? AND multisig_address = ?", req.ChainId, req.MultisigAddress).Error; err != nil {
			if !errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.Wrap(err, "failed to find last tx")
			}
		}
		if lastSequenceTx.Sequence >= sequence {
			sequence = lastSequenceTx.Sequence + 1
		}

		if err := tx.Create(&Transaction{
			MultisigChainID: req.GetChainId(),
			MultisigAddress: req.GetMultisigAddress(),
			AccountNumber:   req.GetAccountNumber(),
			Sequence:        sequence,
			MsgsJSON:        datatypes.JSON(req.GetMsgsJson()),
			FeeJSON:         req.GetFeeJson(),
			CreatorAddress:  userAddress,
			Type:            kind,
		}).Error; err != nil {
			return errors.Wrap(err, "failed to create transaction")
		}

		return nil
	}); err != nil {
		return nil, err
	}
	return &multisigpb.CreateTransactionResponse{}, nil
}

func (s *multisigService) SignTransaction(_ context.Context, req *multisigpb.SignTransactionRequest) (*multisigpb.SignTransactionResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	if err := s.db.Transaction(func(tx *gorm.DB) error {
		var transaction Transaction
		if err := tx.First(&transaction, "id = ?", req.GetTransactionId()).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("transaction not found")
			}
			return errors.Wrap(err, "failed to find transaction")
		}

		if err := tx.First(&UserMultisig{}, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", transaction.MultisigChainID, userAddress, transaction.MultisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("user is not a member of the multisig")
			}
			return errors.Wrap(err, "failed to find user multisig")
		}

		if err := tx.Create(&Signature{
			Transaction: Transaction{ID: uint(req.GetTransactionId())},
			UserAddress: userAddress,
			Signature:   req.GetSignature(),
			BodyBytes:   req.GetBodyBytes(),
		}).Error; err != nil {
			return errors.Wrap(err, "failed to create signature")
		}

		return nil
	}); err != nil {
		return nil, err
	}

	return &multisigpb.SignTransactionResponse{}, nil
}

func (s *multisigService) CompleteTransaction(_ context.Context, req *multisigpb.CompleteTransactionRequest) (*multisigpb.CompleteTransactionResponse, error) {
	userAddress, err := s.authenticate(s.db, req.GetAuthToken())
	if err != nil {
		return nil, errors.Wrap(err, "failed to authenticate")
	}

	if err := s.db.Transaction(func(tx *gorm.DB) error {
		var transaction Transaction
		if err := tx.First(&transaction, "id = ?", req.GetTransactionId()).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("transaction not found")
			}
			return errors.Wrap(err, "failed to find transaction")
		}

		if err := tx.First(&UserMultisig{}, "multisig_chain_id = ? AND user_address = ? AND multisig_address = ?", transaction.MultisigChainID, userAddress, transaction.MultisigAddress).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return errors.New("user is not a member of the multisig")
			}
			return errors.Wrap(err, "failed to find user multisig")
		}

		if err := tx.Model(&Transaction{ID: uint(req.GetTransactionId())}).UpdateColumn("final_hash", req.GetFinalHash()).Error; err != nil {
			return errors.Wrap(err, "failed to write final hash")
		}

		return nil
	}); err != nil {
		return nil, err
	}

	return &multisigpb.CompleteTransactionResponse{}, nil
}

// Auth
func (s *multisigService) GetChallenge(_ context.Context, req *multisigpb.GetChallengeRequest) (*multisigpb.GetChallengeResponse, error) {
	challenge, err := makeChallenge(s.privateKey, s.opts.ChallengeDuration)
	if err != nil {
		return nil, errors.Wrap(err, "failed to make challenge")
	}
	return &multisigpb.GetChallengeResponse{
		Challenge: challenge,
	}, nil
}

func (s *multisigService) GetToken(_ context.Context, req *multisigpb.GetTokenRequest) (*multisigpb.GetTokenResponse, error) {
	infoBytes := []byte(req.GetInfoJson())
	var info multisigpb.TokenRequestInfo
	if err := protojson.Unmarshal(infoBytes, &info); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal info")
	}

	if info.Kind != clientMagic {
		return nil, errors.New("invalid kind")
	}

	prefix := info.UserBech32Prefix
	if prefix == "" {
		return nil, errors.New("missing user bech32 prefix in request")
	}

	err := validateChallenge(s.publicKey, info.Challenge)
	if err != nil {
		return nil, errors.Wrap(err, "invalid challenge")
	}

	userPublicKey, err := parsePubKeyJSON(info.UserPubkeyJson)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse user pubkey json")
	}
	addressBytes := userPublicKey.Address()

	chainUserAddress, err := bech32.ConvertAndEncode(prefix, addressBytes)
	if err != nil {
		return nil, errors.Wrap(err, "failed to encode bech32 address")
	}

	signatureBase64 := req.GetUserSignature()
	signature, err := base64.StdEncoding.DecodeString(signatureBase64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to decode signature")
	}
	if !userPublicKey.VerifySignature(makeADR36SignDoc(infoBytes, chainUserAddress), []byte(signature)) {
		return nil, errors.New("invalid user signature")
	}

	crossChainAddress, err := bech32.ConvertAndEncode(universalBech32Prefix, addressBytes)
	if err != nil {
		return nil, errors.Wrap(err, "failed to re-encode user address, this should never happen")
	}

	nonce, err := makeNonce()
	if err != nil {
		return nil, errors.Wrap(err, "failed to make nonce")
	}

	token := &multisigpb.Token{
		Nonce:       nonce,
		UserAddress: crossChainAddress,
		Expiration:  formatTime(time.Now().Add(s.opts.TokenDuration)),
	}
	tokenBytes, err := proto.Marshal(token)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal token")
	}

	token.ServerSignature = ed25519.Sign(s.privateKey, tokenBytes)

	return &multisigpb.GetTokenResponse{
		AuthToken: token,
	}, nil
}

var ErrBadToken = errors.New("bad token")
var ErrTokenExpired = errors.New("token expired")
var ErrNotFound = errors.New("not found")

func (s *multisigService) authenticate(tx *gorm.DB, token *multisigpb.Token) (string, error) {
	expiration, err := parseTime(token.Expiration)
	if err != nil {
		return "", errors.Wrap(err, "failed to parse expiration")
	}

	if !expiration.After(time.Now()) {
		return "", ErrTokenExpired
	}

	copy := proto.Clone(token).(*multisigpb.Token)
	copy.ServerSignature = nil
	tokenBytes, err := proto.Marshal(copy)
	if err != nil {
		return "", errors.Wrap(err, "failed to marshal token")
	}
	if !ed25519.Verify(s.publicKey, tokenBytes, token.ServerSignature) {
		return "", ErrBadToken
	}

	return token.UserAddress, nil
}
