import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getUserSlug } from "utils/functions";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Users: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/users");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

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
      <Heading desc="">Users</Heading>

      <Table>
        <Table.Head>
          {[
            "id",
            "first name",
            "last name",
            "username",
            "email",
            "wallet address",
            "created nfts count",
            "owned nfts count",
            "is subscribed",
            "status",
            "actions",
          ].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((user: UserData, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                user.id,
                user.first_name,
                user.last_name,
                getUserSlug(user),
                user.email,
                user.wallet_address,
                user.created_nfts_count,
                user.owned_nfts_count,
                user.is_subscribed ? "yes" : "no",
              ].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  <span>{`${item.toString() || "-"}`}</span>
                </Table.Cell>
              ))}

              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <Badge
                  color={
                    user.status == "active"
                      ? "green"
                      : user.status == "suspended"
                      ? "red"
                      : "blue"
                  }
                  name={user.status}
                />
              </Table.Cell>

              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary onClick={() => navigate(`/user/${user.id}`)}>
                  show details
                </ButtonSecondary>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}
    </div>
  );
};

export default Users;
