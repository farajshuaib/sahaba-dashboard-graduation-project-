import { Table } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getUserSlug } from "utils/functions";

interface Props {
  children?: React.ReactNode;
  collaborators: Collaborators[];
}

const CollectionCollaborators: React.FC<Props> = ({ collaborators }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table>
        <Table.Head>
          {[
            "id",
            "first name",
            "last name",
            "username",
            "email",
            "wallet address",
            "is verified",
            "created nfts count",
            "owned nfts count",
            "is subscribed",
            "actions",
          ].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {collaborators.map((user: Collaborators, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                user.id,
                user.first_name || "-",
                user.last_name || "-",
                getUserSlug(user) || "-",
                user.email || "-",
                user.wallet_address || "-",
                user.is_verified ? "yes" : "no",
                user.created_nfts_count || "-",
                user.owned_nfts_count || "-",
                user.is_subscribed ? "yes" : "no",
              ].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  <span>{`${item}`}</span>
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <ButtonSecondary onClick={() => navigate(`/user/${user.id}`)}>
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

export default CollectionCollaborators;
