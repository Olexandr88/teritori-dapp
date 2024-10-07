package main

import (
	"log"
	"os"
	"time"

	"github.com/TERITORI/gh-verify-agent/clientql"
	"github.com/TERITORI/gh-verify-agent/db"
	"github.com/TERITORI/gh-verify-agent/signer"
	"github.com/go-co-op/gocron"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

var gnoSigner *signer.Signer

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}

	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, err := db.New()
	if err != nil {
		panic(err)
	}
	mnemonic := os.Getenv("GNO_MNEMONIC")
	chainID := os.Getenv("GNO_CHAIN_ID")
	rpcAddr := os.Getenv("GNO_RPC_ADDR")
	realmPath := os.Getenv("GNO_REALM_PATH")

	gnoSigner = signer.New(db, logger.Sugar(), mnemonic, chainID, rpcAddr, realmPath)

	clientql := clientql.New("http://localhost:8546/graphql/query", db, logger.Sugar(), gnoSigner)
	schedule := gocron.NewScheduler(time.UTC)

	schedule.Every(30).Seconds().Do(func() {
		err = clientql.DealWithVerifications()
		if err != nil {
			logger.Error("failed to get names list", zap.Error(err))
			panic(err)
		}
	})

	schedule.StartBlocking()
}
