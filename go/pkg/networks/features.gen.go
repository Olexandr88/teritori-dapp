package networks

import (
	"encoding/json"
	"github.com/pkg/errors"
)

const (
	FeatureTypeNFTMarketplace            = FeatureType("NFTMarketplace")
	FeatureTypeNFTLaunchpad              = FeatureType("NFTLaunchpad")
	FeatureTypeNameService               = FeatureType("NameService")
	FeatureTypeSwap                      = FeatureType("Swap")
	FeatureTypeBurnTokens                = FeatureType("BurnTokens")
	FeatureTypeOrganizations             = FeatureType("Organizations")
	FeatureTypeP2E                       = FeatureType("P2E")
	FeatureTypeSocialFeed                = FeatureType("SocialFeed")
	FeatureTypeUPP                       = FeatureType("UPP")
	FeatureTypeRiotP2E                   = FeatureType("RiotP2E")
	FeatureTypeNFTBridge                 = FeatureType("NFTBridge")
	FeatureTypeCosmWasmPremiumFeed       = FeatureType("CosmWasmPremiumFeed")
	FeatureTypeGnoProjectManager         = FeatureType("GnoProjectManager")
	FeatureTypeLaunchpadERC20            = FeatureType("LaunchpadERC20")
	FeatureTypeNFTMarketplaceLeaderboard = FeatureType("NFTMarketplaceLeaderboard")
	FeatureTypeCosmWasmNFTsBurner        = FeatureType("CosmWasmNFTsBurner")
)

type FeatureCosmWasmPremiumFeed struct {
	*FeatureBase
	MembershipContractAddress string `json:"membershipContractAddress"`
	MintDenom                 string `json:"mintDenom"`
}

var _ Feature = &FeatureCosmWasmPremiumFeed{}

func (f FeatureCosmWasmPremiumFeed) Type() FeatureType {
	return FeatureTypeCosmWasmPremiumFeed
}

func (nb *NetworkBase) GetFeatureCosmWasmPremiumFeed() (*FeatureCosmWasmPremiumFeed, error) {
	feature, err := nb.GetFeature(FeatureTypeCosmWasmPremiumFeed)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureCosmWasmPremiumFeed), nil
}

type FeatureCosmWasmNFTsBurner struct {
	*FeatureBase
	BurnerContractAddress string `json:"burnerContractAddress"`
}

var _ Feature = &FeatureCosmWasmNFTsBurner{}

func (f FeatureCosmWasmNFTsBurner) Type() FeatureType {
	return FeatureTypeCosmWasmNFTsBurner
}

func (nb *NetworkBase) GetFeatureCosmWasmNFTsBurner() (*FeatureCosmWasmNFTsBurner, error) {
	feature, err := nb.GetFeature(FeatureTypeCosmWasmNFTsBurner)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureCosmWasmNFTsBurner), nil
}

type FeatureNFTLaunchpad struct {
	*FeatureBase
	LaunchpadContractAddress string  `json:"launchpadContractAddress"`
	DefaultMintDenom         string  `json:"defaultMintDenom"`
	LaunchpadEndpoint        string  `json:"launchpadEndpoint"`
	CodeId                   float64 `json:"codeId"`
	NftTr721CodeId           float64 `json:"nftTr721CodeId"`
}

var _ Feature = &FeatureNFTLaunchpad{}

func (f FeatureNFTLaunchpad) Type() FeatureType {
	return FeatureTypeNFTLaunchpad
}

func (nb *NetworkBase) GetFeatureNFTLaunchpad() (*FeatureNFTLaunchpad, error) {
	feature, err := nb.GetFeature(FeatureTypeNFTLaunchpad)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureNFTLaunchpad), nil
}

type FeatureGnoProjectManager struct {
	*FeatureBase
	ProjectsManagerPkgPath string `json:"projectsManagerPkgPath"`
	PaymentsDenom          string `json:"paymentsDenom"`
}

var _ Feature = &FeatureGnoProjectManager{}

func (f FeatureGnoProjectManager) Type() FeatureType {
	return FeatureTypeGnoProjectManager
}

func (nb *NetworkBase) GetFeatureGnoProjectManager() (*FeatureGnoProjectManager, error) {
	feature, err := nb.GetFeature(FeatureTypeGnoProjectManager)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureGnoProjectManager), nil
}

type FeatureLaunchpadERC20 struct {
	*FeatureBase
	LaunchpadERC20PkgPath string `json:"launchpadERC20PkgPath"`
	PaymentsDenom         string `json:"paymentsDenom"`
}

var _ Feature = &FeatureLaunchpadERC20{}

func (f FeatureLaunchpadERC20) Type() FeatureType {
	return FeatureTypeLaunchpadERC20
}

func (nb *NetworkBase) GetFeatureLaunchpadERC20() (*FeatureLaunchpadERC20, error) {
	feature, err := nb.GetFeature(FeatureTypeLaunchpadERC20)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureLaunchpadERC20), nil
}

type FeatureNFTMarketplace struct {
	*FeatureBase
	CwAddressListContractAddress string  `json:"cwAddressListContractAddress"`
	CwAddressListCodeId          float64 `json:"cwAddressListCodeId"`
}

var _ Feature = &FeatureNFTMarketplace{}

func (f FeatureNFTMarketplace) Type() FeatureType {
	return FeatureTypeNFTMarketplace
}

func (nb *NetworkBase) GetFeatureNFTMarketplace() (*FeatureNFTMarketplace, error) {
	feature, err := nb.GetFeature(FeatureTypeNFTMarketplace)
	if err != nil {
		return nil, err
	}
	return feature.(*FeatureNFTMarketplace), nil
}

func UnmarshalFeature(b []byte) (Feature, error) {
	var base FeatureBase
	if err := json.Unmarshal(b, &base); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal feature base")
	}
	switch base.Type {
	case FeatureTypeCosmWasmPremiumFeed:
		var f FeatureCosmWasmPremiumFeed
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature CosmWasmPremiumFeed")
		}
		return &f, nil
	case FeatureTypeCosmWasmNFTsBurner:
		var f FeatureCosmWasmNFTsBurner
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature CosmWasmNFTsBurner")
		}
		return &f, nil
	case FeatureTypeNFTLaunchpad:
		var f FeatureNFTLaunchpad
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature NFTLaunchpad")
		}
		return &f, nil
	case FeatureTypeGnoProjectManager:
		var f FeatureGnoProjectManager
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature GnoProjectManager")
		}
		return &f, nil
	case FeatureTypeLaunchpadERC20:
		var f FeatureLaunchpadERC20
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature LaunchpadERC20")
		}
		return &f, nil
	case FeatureTypeNFTMarketplace:
		var f FeatureNFTMarketplace
		if err := json.Unmarshal(b, &f); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal feature NFTMarketplace")
		}
		return &f, nil
	}
	return nil, errors.Errorf("unknown feature type %s", base.Type)
}
