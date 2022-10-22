import { Table } from "flowbite-react";
import moment from "moment";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getUserSlug } from "utils/functions";

interface Props {
  nfts: Nft[];
}

const NftsTable: React.FC<Props> = ({ nfts }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table>
        <Table.Head>
          {[
            "id",
            "token id",
            "title",
            "price",
            "is for sale",
            "likes",
            "watches",
            "created at",
            "collection",
            "creator",
            "owner",
            "file",
            "action",
          ].map((key, index) => (
            <Table.HeadCell className="whitespace-nowrap" key={index}>
              {key}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {nfts.map((nft: Nft, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                nft.id,
                nft.token_id,
                nft.title,
                nft.price,
                nft.is_for_sale,
                nft.like_count,
                nft.watch_time,
                moment(nft.created_at).format("DD/MM/YYYY HH:mm"),
              ].map((val, innerIndex) => (
                <Table.Cell
                  key={innerIndex}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  {`${val != null ? val : "unknown"}`}
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink
                  to={`/collection/${nft.collection.id}`}
                  className="link"
                >
                  <span>{nft.collection.name}</span>
                </NavLink>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/user/${nft.creator.id}`} className="link">
                  <span>{getUserSlug(nft.creator)}</span>
                </NavLink>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/user/${nft.owner.id}`} className="link">
                  <span>{getUserSlug(nft.owner)}</span>
                </NavLink>
              </Table.Cell>

              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <a href={nft.file_path} target="_blank" className="link">
                  <i className="bx bx-image-alt"></i>
                  <span>preview</span>
                </a>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary onClick={() => navigate(`/nft/${nft.id}`)}>
                  show details
                </ButtonSecondary>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default NftsTable;
