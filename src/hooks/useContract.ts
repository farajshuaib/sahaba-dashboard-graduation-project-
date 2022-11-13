import { useWeb3React } from "@web3-react/core";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  TEST_CONTRACT_ADDRESS,
} from "constant";
import { Contract } from "ethers";
import { useMemo } from "react";
import { SahabaMarketplace } from "../typechain-types";

export default function useContract() {
  const { chainId, library, account } = useWeb3React();

  const contract = useMemo(() => {
    return new Contract(
      chainId == 1 ? CONTRACT_ADDRESS : TEST_CONTRACT_ADDRESS,
      CONTRACT_ABI,
      library.getSigner()
    );
  }, [chainId, library]);

  function isApprovedForAll() {
    return contract.isApprovedForAll(
      account,
      chainId == 1 ? CONTRACT_ADDRESS : TEST_CONTRACT_ADDRESS
    );
  }

  function setApprovalForAll() {
    return contract.setApprovalForAll(
      chainId == 1 ? CONTRACT_ADDRESS : TEST_CONTRACT_ADDRESS,
      true
    );
  }

  return {
    contract: contract as SahabaMarketplace,
    isApprovedForAll,
    setApprovalForAll,
  };
}
