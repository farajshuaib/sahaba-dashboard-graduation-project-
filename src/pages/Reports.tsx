import EmptyData from "components/EmptyData";
import LoadingScreen from "components/LoadingScreen";
import ReportsTable from "components/ReportsTable";
import ServerError from "components/ServerError";
import { Table } from "flowbite-react";
import { useCrud } from "hooks/useCrud";
import React, { useEffect, useState } from "react";
import Heading from "shared/Heading/Heading";
import Pagination from "shared/Pagination/Pagination";

const Reports: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/reports");
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
      <Heading desc="">Reports</Heading>

      <ReportsTable reports={data} />
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
    </div>
  );
};

export default Reports;
