import { Tab } from "@headlessui/react";
import CollectionCollaborators from "components/CollectionCollaborators";
import EmptyData from "components/EmptyData";
import Labeled from "components/Labeled";
import LoadingScreen from "components/LoadingScreen";
import NftsTable from "components/NftsTable";
import ReportsTable from "components/ReportsTable";
import ServerError from "components/ServerError";
import { useCrud } from "hooks/useCrud";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "shared/Heading/Heading";
import Pagination from "shared/Pagination/Pagination";
import { getUserSlug } from "utils/functions";

const _renderTabCollectionDetails = (collection: Collection) => (
  <section className="grid grid-cols-2 gap-5 my-8 md:grid-cols-2 ">
    <Labeled title="name" value={collection?.name} />
    <Labeled title="category" value={collection?.category.name} />
    <Labeled
      title="is sensitive content"
      value={collection?.is_sensitive_content ? "yes" : "nol"}
    />
    <Labeled title="max price" value={`${collection?.max_price}`} />
    <Labeled title="min price" value={`${collection?.min_price}`} />
    <Labeled title="volume" value={`${collection?.volume}`} />
    <Labeled title="number of NFTs" value={`${collection?.nfts_count}`} />
    <Labeled title="created by" value={getUserSlug(collection?.created_by)} />
    <Labeled preview title="logo image" value={collection?.logo_image} />
    <Labeled
      preview
      title="website"
      value={collection?.social_links?.website_url}
    />
    <Labeled
      preview
      title="twitter"
      value={collection?.social_links?.twitter_url}
    />
    <Labeled
      preview
      title="facebook"
      value={collection?.social_links?.facebook_url}
    />
    <Labeled
      preview
      title="telegram"
      value={collection?.social_links?.telegram_url}
    />
    <Labeled
      preview
      title="instagram"
      value={collection?.social_links?.instagram_url}
    />
  </section>
);

const RenderCollectionNfts: React.FC = () => {
  const params = useParams();
  const { data, fetch, loading, errors, meta } = useCrud(
    `/nfts?collection=${params.id}`
  );
  const [page, setPage] = useState<number>(1);

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
      <NftsTable nfts={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const RenderCollectionReports: React.FC = () => {
  const { data, loading, fetch, errors, meta } = useCrud(`/reports`);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page, reportable: "Collection" });
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
      <ReportsTable reports={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const CollectionDetails: React.FC = () => {
  const params = useParams();
  const { fetchById, loading, item, errors } = useCrud(`/collections`);

  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate("/collections");
      toast.warn("collection not found...");
      return;
    }
    fetchById(params.id);
  }, [params.id]);

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
    switch (tab) {
      case "Info":
        return _renderTabCollectionDetails(item);
      case "NFTs":
        return <RenderCollectionNfts />;
      case "Collaborators":
        return <CollectionCollaborators collaborators={item.collaborators} />;
      case "Reports":
        return <RenderCollectionReports />;
      default:
        return <></>;
    }
  };

  return (
    <div className="">
      <section className="p-5 bg-white rounded-lg shadow-sm ">
        <Heading desc="">Collection Details</Heading>

        <Tab.Group>
          <Tab.List className="flex justify-start gap-3 rounded-full pd-1 ">
            {["Info", "NFTs", "Collaborators", "Reports"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
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
            {["Info", "NFTs", "Collaborators", "Reports"].map((tab, idx) => (
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
    </div>
  );
};

export default CollectionDetails;
