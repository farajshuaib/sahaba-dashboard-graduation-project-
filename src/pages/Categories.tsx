import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Categories: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { fetch, loading, data, meta, errors } = useCrud("/categories");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

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
      <Heading desc="">{t("categories")}</Heading>

      <div className="flex justify-end my-8">
        <ButtonPrimary href="/category/form">
          {t("create-new-category")}
        </ButtonPrimary>
      </div>

      <Table>
        <Table.Head>
          {[
            "id",
            t("name"),
            t("number-of-collection"),
            t("number-of-nfts"),
            t("icon"),
            t("action"),
          ].map((key, index) => (
            <Table.HeadCell className="whitespace-nowrap" key={index}>
              {key}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((category: Category, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                category.id,
                category.name,
                category.collections_count,
                category.nfts_count,
              ].map((val, innerIndex) => (
                <Table.Cell
                  key={innerIndex}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  {`${val.toString() || "unknown"}`}
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <a
                  href={category.icon}
                  target="_blank"
                  className="items-center text-blue-500"
                >
                  <span>{t("preview-icon")}</span>
                </a>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary
                  onClick={() => navigate(`/category/form/${category.id}`)}
                >
                  {t("edit")}
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

export default Categories;
