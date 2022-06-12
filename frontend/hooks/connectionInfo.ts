import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import StorageUtils from "../utils/storage";

const useConnectionInfo = () => {
  const [user, setUser] = useState({} as any);
  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, []);

  if (user.solana) {
    const { connection } = useConnection();
    const wallet = useWallet();

    return {
      user,
      chainId: 103,
      connection,
      wallet,
    };
  } else {
    const context = useWeb3React();
    const { chainId, library } = context;

    return {
      chainId,
      library,
      user,
    };
  }
};

export default useConnectionInfo;
