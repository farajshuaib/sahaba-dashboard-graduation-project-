import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getUserSlug } from "utils/functions";
import EmptyData from "../components/EmptyData";
import LoadingScreen from "../components/LoadingScreen";
import ServerError from "../components/ServerError";
import { useCrud } from "../hooks/useCrud";
import Heading from "../shared/Heading/Heading";
import Pagination from "../shared/Pagination/Pagination";

const Collections: React.FC = () => {
  const { fetch, loading, data, meta, errors } = useCrud("/collections");
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
      <Heading desc="">Collections</Heading>

      <Table>
        <Table.Head>
          {[
            "id",
            "name",
            "CATEGORY",
            "CREATED BY",
            "IS SENSITIVE CONTENT",
            "number of NFTS",
            "VOLUME",
            "MIN PRICE",
            "MAX PRICE",
            "logo image",
            "website",
            "twitter",
            "facebook",
            "telegram",
            "instagram",
            "action",
          ].map((key, index) => (
            <Table.HeadCell className="whitespace-nowrap" key={index}>
              {key}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((collection: Collection, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                collection.id,
                collection.name,
                collection.category.name,
                getUserSlug(collection.created_by),
                collection.is_sensitive_content ? "yes" : "no",
                collection.nfts_count,
                collection.volume,
                collection.min_price,
                collection.max_price,
              ].map((val, innerIndex) => (
                <Table.Cell
                  key={innerIndex}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  {val || "-"}
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <a
                  href={collection.logo_image}
                  target="_blank"
                  className="link"
                >
                  <i className="bx bx-image-alt"></i>
                  <span>preview</span>
                </a>
              </Table.Cell>
              {[
                collection?.social_links?.website_url,
                collection?.social_links?.twitter_url,
                collection?.social_links?.facebook_url,
                collection?.social_links?.telegram_url,
                collection?.social_links?.instagram_url,
              ].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  {item ? (
                    <a href={item} target="_blank" className="link">
                      <span>preview</span>
                    </a>
                  ) : (
                    "-"
                  )}
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary
                  onClick={() => navigate(`/collection/${collection.id}`)}
                >
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

export default Collections;
