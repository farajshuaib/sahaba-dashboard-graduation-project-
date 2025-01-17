import TransactionsTable from "components/TransactionsTable";
import { Table } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Transactions: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/transactions");
  const [page, setPage] = useState<number>(1);
  const { t, i18n } = useTranslation();


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
      <Heading desc="">{t('transactions')}</Heading>

      <TransactionsTable transactions={data} />
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
    </div>
  );
};

export default Transactions;
