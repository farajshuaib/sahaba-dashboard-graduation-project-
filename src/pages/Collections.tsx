import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Collections: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/collections");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page });
  }, []);

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
      <Heading desc="">Collections</Heading>

      <Table>
        <Table.Head>
          {Object.keys(data[0]).map((key, index) => (
            <Table.HeadCell key={index}>{key}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((user, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {Object.values(user).map((val, innerIndex) => (
                <Table.Cell
                  key={innerIndex}
                  className="whitespace-nowrap font-medium text-gray-800 dark:text-white"
                >
                  {`${val != null ? val : "unknown"}`}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
    </div>
  );
};

export default Collections;
