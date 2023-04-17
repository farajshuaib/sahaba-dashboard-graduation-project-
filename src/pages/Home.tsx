import LoadingScreen from "components/LoadingScreen";
import { useCrud } from "hooks/useCrud";
import React from "react";
import { useEffect } from "react";
import logo_light from "../assets/logo_light.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { useApi } from "hooks/useApi";
import ServiceFeesCard from "components/ServiceFeesCard";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import ServerError from "components/ServerError";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Home: React.FC = () => {
  const api = useApi();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [errors, setErrors] = React.useState<boolean>(false);
  const [kycData, setKycData] = React.useState<any>();
  const [transactionData, setTransactionData] = React.useState<any>();
  const [categoriesNftsData, setCategoriesNftsData] = React.useState<any>();
  const { t, i18n } = useTranslation();

  const fetchData = async () => {
    try {
      const { data: transaction } = await api.get("/statistics/transactions");
      const { data: kyc } = await api.get("/statistics/kyc");
      const { data: categoriesNfts } = await api.get(
        "/statistics/categories-nfts"
      );
      setKycData(kyc.data);
      setTransactionData(transaction.data);
      setCategoriesNftsData(categoriesNfts.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrors(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section className="relative overflow-hidden  shadow-lg sm:rounded-lg col-span-12 text-white lg:col-span-4 bg-primary-700">
        <div className="px-6 py-4">
          <div className="flex flex-wrap items-center gap-4 py-4">
            <img src={logo_light} alt="" className="w-24 h-24 object-cover" />
            <div className="flex flex-col gap-2">
              <span className="font-semibold uppercase">
                {t("total-sold-tokens")}
              </span>
              <div className="flex items-end gap-2">
                <span className="text-2xl">
                  {transactionData.count?.total_sold_tokens}
                  <span className="text-xs text-gray-100">NFTs</span>
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 mb-2 font-semibold uppercase">
            {t('total-sold-amount')}
          </p>
          <div className="flex flex-wrap gap-4">
            <div>
              <p>
                {`${transactionData.count?.total_sold_amount.toFixed(4)}`}
                <span className="text-xs text-gray-100"> ETH</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeesCard />

      <section className="relative overflow-hidden bg-white shadow-lg sm:rounded-lg col-span-12 lg:col-span-8">
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="text-xl font-semibold">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">{t("transactions")}</p>
              <p className="text-sm text-gray-500">{t("last-30-days")}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          {/* chart */}
          {transactionData.statistics && (
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: t("transactions-events") as string,
                  },
                },
              }}
              data={{
                labels: Object.values(transactionData.statistics?.labels),
                datasets: [
                  {
                    label: "mint",
                    data: transactionData.statistics?.mint,
                    borderColor: "rgb(4, 108, 78)",
                    backgroundColor: "rgba(4, 108, 78, 0.5)",
                  },
                  {
                    label: "sale",
                    data: transactionData.statistics?.sale,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                ],
              }}
            />
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white shadow-lg sm:rounded-lg col-span-12 lg:col-span-4">
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="text-xl font-semibold">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">
                {t("nfts-in-each-category")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Pie
            data={{
              labels: categoriesNftsData?.labels,
              datasets: [
                {
                  label: "NFTs",
                  data: categoriesNftsData.data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 109, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 109, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </section>

      <section className="flex flex-col col-span-12 gap-4 lg:col-span-4">
        {[
          {
            title: t("total-kyc-applications"),
            value: kycData.count?.total,
            color: " bg-gray-500/20 text-gray-700",
          },
          {
            title: t("on-review-kyc-applications"),
            value: kycData.count?.on_review,
            color: " bg-blue-500/20 text-blue-700",
          },
          {
            title: t("approved-kyc-applications"),
            value: kycData.count?.approved,
            color: " bg-green-500/20 text-green-700",
          },
          {
            title: t("pending-kyc-applications"),
            value: kycData.count?.pending,
            color: "bg-yellow-500/20 text-yellow-700",
          },
          {
            title: t("rejected-kyc-applications"),
            value: kycData.count?.rejected,
            color: "bg-red-500/20 text-red-700",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white shadow-lg sm:rounded-lg"
          >
            <div className="px-6 py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div
                  className={`p-4 rounded-lg flex items-center ${item.color}`}
                >
                  <i className="bx bx-id-card"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500 uppercase">
                    {item.title}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden bg-white shadow-lg sm:rounded-lg col-span-12 lg:col-span-8">
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="text-xl font-semibold">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">{t("kyc-applications")}</p>
              <p className="text-sm text-gray-500">{t("last-30-days")}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          {/* chart */}
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: t("kyc-applications") as string,
                },
              },
            }}
            data={{
              labels: kycData.statistics?.labels,
              datasets: [
                {
                  label: "rejection",
                  data: kycData.statistics?.rejection,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                  label: "approval",
                  data: kycData.statistics?.approved,
                  borderColor: "rgb(4, 108, 78)",
                  backgroundColor: "rgba(4, 108, 78, 0.5)",
                },
                {
                  label: "pending",
                  data: kycData.statistics?.pending,
                  borderColor: "rgb(142, 75, 16)",
                  backgroundColor: "rgba(142, 75, 16, 0.5)",
                },
                {
                  label: "on review",
                  data: kycData.statistics?.on_review,
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
