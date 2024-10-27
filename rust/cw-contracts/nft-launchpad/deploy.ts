import { deploy, instantiate } from "../../utils/scripts";

const WASM_FILE = "nft_launchpad-aarch64.wasm";
const LAUNCHPAD_ADMIN = "tori1zsgm6hvx4a3t08vsanwdcvvnv2xca9faavzccm";

const main = async () => {
  const codeId = await deploy(WASM_FILE);
  const initMsg = {
    config: {
      name: "Teritori launchpad",
      supported_networks: [],
      nft_code_id: 1,
      launchpad_admin: LAUNCHPAD_ADMIN,
    },
  };
  const contractAddress = await instantiate(
    codeId,
    "Teritori Launchpad",
    initMsg,
  );

  console.log("CodeId:", codeId, "- Contract Address:", contractAddress);
};

main();
