import { Table } from "flowbite-react";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getUserSlug } from "utils/functions";

interface props {
  transactions: Transactions[];
}

const TransactionsTable: React.FC<props> = ({ transactions }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Table>
        <Table.Head>
          {[
            "id",
            t('from-user'),
            t('to-user'),
            t('nft'),
            t('type'),
            t('price'),
            t('created-at'),
          ].map((key, index) => (
            <Table.HeadCell key={index}>{key}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.map((transaction: Transactions, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                {transaction.id}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/user/${transaction.from?.id}`} className="link">
                  <span>{getUserSlug(transaction?.from)}</span>
                </NavLink>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/user/${transaction?.to?.id}`} className="link">
                  <span>{getUserSlug(transaction?.to)}</span>
                </NavLink>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink to={`/nft/${transaction?.nft?.id || ""}`} className="link">
                  <span>{transaction?.nft?.title || "-"}</span>
                </NavLink>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <span>{transaction.type}</span>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <span>{transaction.price + " ETH"}</span>
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <span>
                  {moment(transaction.created_at).format("YYYY-MM-DD HH:MM")}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TransactionsTable;
