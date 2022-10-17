import { useEffect } from "react";

import { create } from "ipfs-http-client";
import { useState } from "react";
import { IPFSHTTPClient } from "ipfs-http-client/dist/src/types";

const useIpfs = (): IPFSHTTPClient => {
  const [client, setClient] = useState<IPFSHTTPClient>();

  const auth =
    "Basic " +
    Buffer.from(
      import.meta.env.VITE_IPFS_PROJECT_ID +
        ":" +
        import.meta.env.VITE_IPFS_PROJECT_SECRET
    ).toString("base64");

  useEffect(() => {
    if (!client)
      setClient(
        create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization: auth,
          },
        })
      );
  }, []);

  return client as IPFSHTTPClient;
};

export default useIpfs;
