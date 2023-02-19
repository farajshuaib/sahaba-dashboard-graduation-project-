import NftsTable from "components/NftsTable";
import React, { useEffect, useState } from "react";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Nfts: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/nfts");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page });
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  if (data.length == 0) {
    return <EmptyData />;
  }

  return (
    <div>
      <Heading desc="">NFTs</Heading>

      <NftsTable nfts={data} />
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
    </div>
  );
};

export default Nfts;
