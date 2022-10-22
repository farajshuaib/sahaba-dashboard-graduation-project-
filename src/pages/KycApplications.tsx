import { Table } from "flowbite-react";
import { useApi } from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const KycApplications: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/kyc");
  const [page, setPage] = useState<number>(1);
  const api = useApi();

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

  const toggleUserKyc = (user: UserData) => {
   
  };

  return (
    <div>
      <Heading desc="">KYC Applications</Heading>

      <Table>
        <Table.Head>
          {[
            "id",
            "user",
            "gender",
            "country",
            "city",
            "address",
            "phone number",
            "author type",
            "art type",
            "passport id",
            "status",
            "action",
          ].map((key, index) => (
            <Table.HeadCell key={index}>{key}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((user: UserData, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                {user.kyc_form?.id}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/user/${user.id}`} className="link">
                  {user.username || user.wallet_address?.slice(0, 6) + "..."}
                </NavLink>
              </Table.Cell>
              {[
                user.kyc_form?.gender,
                user.kyc_form?.country,
                user.kyc_form?.city,
                user.kyc_form?.address,
                user.kyc_form?.phone_number,
                user.kyc_form?.author_type,
                user.kyc_form?.author_art_type,
              ].map((val, innerIndex) => (
                <Table.Cell
                  key={innerIndex}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  {val}
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <a
                  href={user.kyc_form.passport_id}
                  target="_blank"
                  className="link"
                >
                  <i className="bx bx-image-alt"></i>
                  <span>preview</span>
                </a>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <Badge
                  color={
                    user.kyc_form.status == "approved"
                      ? "green"
                      : user.kyc_form.status == "on_review"
                      ? "blue"
                      : user.kyc_form.status == "pending"
                      ? "yellow"
                      : user.kyc_form.status == "rejected"
                      ? "red"
                      : "indigo"
                  }
                  name={user.kyc_form.status}
                />
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary
                  onClick={() => toggleUserKyc(user)}
                  className=""
                >
                  {user.is_verified ? "remove verification" : "Approve"}
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

export default KycApplications;
