import { Table } from "flowbite-react";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getUserSlug } from "utils/functions";

interface Props {
  children?: React.ReactNode;
  collaborators: Collaborators[];
}

const CollectionCollaborators: React.FC<Props> = ({ collaborators }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <Table>
        <Table.Head>
          {[
            "id",
            t('user-id'),
            t("first-name"),
            t('last-name'),
            t('username'),
            t('email'),
            t('wallet-address'),
            t('is-verified'),
            t('created-nfts-count'),
            t('owned-nfts-count'),
            t('is-subscribed'),
            t('created-at'),
            t('actions'),
          ].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {collaborators.map(({ id, user, created_at }, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                id,
                user.id,
                user.first_name || "-",
                user.last_name || "-",
                getUserSlug(user) || "-",
                user.email || "-",
                user.wallet_address || "-",
                user.kyc_form?.status || "-",
                user.created_nfts_count || "-",
                user.owned_nfts_count || "-",
                user.is_subscribed ? "yes" : "no",
                moment(created_at).format("DD/MM/YYYY HH:MM") || "-",
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
