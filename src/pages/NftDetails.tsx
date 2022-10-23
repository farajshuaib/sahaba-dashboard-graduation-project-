import { Tab } from "@headlessui/react";
import EmptyData from "components/EmptyData";
import Labeled from "components/Labeled";
import LoadingScreen from "components/LoadingScreen";
import ReportsTable from "components/ReportsTable";
import ServerError from "components/ServerError";
import TransactionsTable from "components/TransactionsTable";
import { useApi } from "hooks/useApi";
import { useCrud } from "hooks/useCrud";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "shared/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import Pagination from "shared/Pagination/Pagination";
import { getUserSlug } from "utils/functions";

const _renderTabNftDetails = (nft: Nft) => (
  <section className="my-8">
    <div className="grid grid-cols-2 gap-5 my-8 md:grid-cols-2">
      <Labeled title="token id" value={nft?.token_id} />
      <Labeled title="title" value={nft?.title} />
      <Labeled title="is for sale" value={`${nft?.is_for_sale}`} />
      <Labeled title="price" value={`${nft?.price}`} />
      <Labeled title="sale end at" value={`${nft?.sale_end_at}`} />
      <Labeled
        title="collection"
        previewTitle={nft?.collection.name}
        preview
        value={`/collection/${nft?.collection.id}`}
      />
      <Labeled
        title="creator"
        previewTitle={getUserSlug(nft?.creator)}
        preview
        value={`/user/${nft?.creator.id}`}
      />
      <Labeled
        title="owner"
        previewTitle={getUserSlug(nft?.owner)}
        preview
        value={`/user/${nft?.owner.id}`}
      />
      <Labeled title="likes" value={`${nft?.like_count}`} />
      <Labeled title="watches" value={`${nft?.watch_time}`} />
    </div>
  </section>
);

const RenderTabNftTransactions = (nft: Nft) => {
  const { fetch, loading, data, meta, errors } = useCrud(`/transactions`);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page, nft: nft?.id });
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  if (data?.length == 0) {
    return <EmptyData />;
  }

  return (
    <div>
      <TransactionsTable transactions={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const RenderNftsReports: React.FC = () => {
  const { data, loading, fetch, errors, meta } = useCrud(`/reports`);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page, reportable: "NFT" });
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
      <ReportsTable reports={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const NftDetails: React.FC = () => {
  const params = useParams();
  const { fetchById, loading, item, errors } = useCrud(`/nfts`);
  const [changingStatusLoading, setChangingStatusLoading] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const Tabs = ["Info", "Transactions", "Reports"];

  useEffect(() => {
    if (!params.id) {
      navigate("/nfts");
      toast.warn("nft not found...");
      return;
    }
    fetchById(params.id);
  }, []);

  const toggleNFTStatus = async () => {
    if (!item) return;
    try {
      setChangingStatusLoading(true);
      const { data } = await api.put(`/nfts/change-status/${item.id}`);
      toast.success(data.message);
      fetchById(item.id);
      setChangingStatusLoading(false);
    } catch (error: any) {
      setChangingStatusLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  if (!item) {
    return <EmptyData />;
  }

  const renderTabItem = (tab: string) => {
    if (!item) return <></>;
    switch (tab) {
      case "Info":
        return _renderTabNftDetails(item);
      case "Transactions":
        return <RenderTabNftTransactions {...item} />;
      case "Reports":
        return <RenderNftsReports />;
      default:
        return <></>;
    }
  };

  const _renderNFTImage = (nft: Nft) => (
    <div className="p-5 bg-white rounded-lg">
      <NcImage src={nft.file_path} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <section className="col-span-8 p-4 bg-white rounded-lg shadow-sm">
        <Heading desc="">NFT Details</Heading>
        <div className="flex justify-end my-5">
          <button
            onClick={toggleNFTStatus}
            className={`text-white px-3 py-2 rounded-lg text-sm ${
              item.status == "published" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {changingStatusLoading ? (
              <i className="bx bx-loader"></i>
            ) : (
              <span>
                {item.status == "published" ? "hide NFT" : "publish NFT"}
              </span>
            )}
          </button>
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-start gap-3 overflow-scroll rounded-full pd-1">
            {Tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-3.5 whitespace-nowrap sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
                    selected
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                      : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {Tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className={
                  "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
                }
              >
                {renderTabItem(tab)}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </section>
      <section className="flex flex-col col-span-4 gap-5">
        {_renderNFTImage(item)}
      </section>
    </div>
  );
};

export default NftDetails;
