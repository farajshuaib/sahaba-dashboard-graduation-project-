import { Table } from "flowbite-react";
import moment from "moment";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EmptyData from "./EmptyData";

interface Props {
  reports: Reports[];
}

const ReportsTable: React.FC<Props> = ({ reports }) => {
  const navigate = useNavigate();

  if (reports.length == 0) {
    return <EmptyData />;
  }

  return (
    <div>
      <Table>
        <Table.Head>
          {["id","reportable", "type", "message", "date", "reporter"].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {reports.map((report: Reports, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                report.id,
                report.reportable_type,
                report.type || "-",
                report.message || "-",
                moment(report.created_at).format("YYYY MM DD HH:MM") || "-",
              ].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  <span>{`${item}`}</span>
                </Table.Cell>
              ))}
              <Table.Cell className="font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <NavLink className="link" to={`/user/${report.reported_by.id}`}>
                  {report.reported_by.username || report.reported_by.wallet_address.slice(0, 5) + "..." + report.reported_by.wallet_address.slice(-5)}
                </NavLink>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ReportsTable;
