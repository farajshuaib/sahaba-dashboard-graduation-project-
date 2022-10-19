import { Tab } from "@headlessui/react";
import EmptyData from "components/EmptyData";
import Labeled from "components/Labeled";
import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import { Table, Tabs } from "flowbite-react";
import { useApi } from "hooks/useApi";
import { useCrud } from "hooks/useCrud";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Heading from "shared/Heading/Heading";
import Pagination from "shared/Pagination/Pagination";

const RenderTabUserTransactions = (userData: UserData) => {
  const { fetch, loading, data, meta, errors } = useCrud(
    `/users/transactions/${userData?.id}`
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

  if (data?.length == 0) {
    return <EmptyData />;
  }

  return (
    <div>
      <Table>
        <Table.Head>
          {[
            "id",
            "from",
            "to",
            "nft",
            "nft token id",
            "price",
            "type",
            "date",
          ].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((transaction: Transactions, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[
                transaction.id,
                userData.id,
                transaction.to,
                transaction.nft.title,
                transaction.nft.token_id,
                transaction.price,
                transaction.type,
                moment(transaction.created_at).format("YYYY-MM-DD HH:mm"),
              ].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="whitespace-nowrap font-medium text-gray-800 dark:text-white"
                >
                  <span>{`${item}`}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const _renderTabUserDetails = (userData: UserData) => (
  <section className="my-8">
    <Labeled title="Wallet address" value={userData?.wallet_address} />
    <div className="grid grid-cols-2 md:grid-cols-2  gap-5 my-8">
      <Labeled title="First name" value={userData?.first_name} />
      <Labeled title="Last name" value={userData?.last_name} />
      <Labeled title="Username" value={userData?.username} />
      <Labeled title="Email" value={userData?.email} />
      <Labeled
        title="Number of owned NFTs"
        value={`${+userData?.owned_nfts_count}`}
      />
      <Labeled
        title="Number of created NFTs"
        value={`${+userData?.created_nfts_count}`}
      />
      <Labeled
        title="Number of created NFTs"
        value={`${+userData?.created_nfts_count}`}
      />
      <Labeled
        title="Number of created collections"
        value={`${+userData?.collections_count}`}
      />
      <Labeled
        title="Number of followers"
        value={`${+userData?.followers_count}`}
      />
      <Labeled
        title="Number of followings"
        value={`${+userData?.followings_count}`}
      />
      <Labeled
        title="Facebook page"
        value={`${userData?.social_links?.facebook_url}`}
      />
      <Labeled
        title="Twitter page"
        value={`${userData?.social_links?.twitter_url}`}
      />
      <Labeled
        title="Telegram page"
        value={`${userData?.social_links?.telegram_url}`}
      />
      <Labeled
        title="Website page"
        value={`${userData?.social_links?.website_url}`}
      />
      <Labeled
        title="Instagram page"
        value={`${userData?.social_links?.instagram_url}`}
      />
    </div>
  </section>
);

const RenderKYCApplication = (userData: UserData) => {
  const api = useApi();
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const verifyAccount = async () => {
    try {
      setVerifyLoading(true);
      const { data } = await api.post(`/users/verify-account/${userData.id}`);
      toast.success(data.message);
      setVerifyLoading(false);
    } catch (error: any) {
      setVerifyLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      {userData.kyc_form ? (
        <div>
          <div className="flex justify-end my-5">
            <Badge
              color={userData.is_verified ? "green" : "red"}
              name={userData.is_verified ? "Verified" : "not verified"}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2  gap-5 my-8">
            <Labeled
              title="Account type"
              value={userData?.kyc_form?.author_type}
            />
            <Labeled
              title="Author art type"
              value={userData?.kyc_form?.author_art_type}
            />
            <Labeled
              title="Phone number"
              value={userData?.kyc_form?.phone_number}
            />
            <Labeled title="Gender" value={userData?.kyc_form?.gender} />
            <Labeled title="Country" value={userData?.kyc_form?.country} />
            <Labeled title="City" value={userData?.kyc_form?.city} />
            <Labeled title="Address" value={userData?.kyc_form?.address} />
            <div className="">
              <label className="text-xl  text-gray700">passport id</label>
              <a
                href={userData?.kyc_form?.passport_id}
                target="_blank"
                className="my-2 text-xl text-cyan-600 block"
              >
                show passport id
              </a>
            </div>
            <Labeled title="Address" value={userData?.kyc_form?.passport_id} />
          </div>
          {!userData.is_verified && (
            <ButtonPrimary loading={verifyLoading} onClick={verifyAccount}>
              Verify Account
            </ButtonPrimary>
          )}
        </div>
      ) : (
        <EmptyData />
      )}
    </>
  );
};

const UserDetails: React.FC = () => {
  const params = useParams();
  const api = useApi();
  const { fetchById, loading, item, errors } = useCrud(`/users`);
  const [changingStatusLoading, setChangingStatusLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate("/users");
      toast.warn("user not found...");
      return;
    }
    fetchById(params.id);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  if (!item) {
    return <EmptyData />;
  }

  const toggleAccountStatus = async () => {
    try {
      setChangingStatusLoading(true);
      const { data } = await api.post(`/users/toggle-status/${item.id}`);
      toast.success(data.message);
      await fetchById(item.id);
      setChangingStatusLoading(false);
    } catch (error: any) {
      setChangingStatusLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const renderTabItem = (tab: string) => {
    if (!item) return <></>;
    switch (tab) {
      case "Info":
        return _renderTabUserDetails(item);
      case "Transactions":
        return <RenderTabUserTransactions {...item} />;
      case "KYC Application":
        return <RenderKYCApplication {...item} />;
      default:
        return <></>;
    }
  };

  const _renderUserCard = (userData: UserData) => (
    <div className="bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <Avatar sizeClass="w-24 h-24" imgUrl={userData?.profile_photo} />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl">{userData?.username}</h4>
          <h6 className="text-gray-600 text-sm">{userData?.email}</h6>
        </div>
      </div>
      <p className="my-3">{userData?.bio}</p>
      <div className="my-2 flex items-center flex-wrap gap-3">
        <Badge
          name={`Account: ${userData?.status}`}
          color={userData?.status == "enabled" ? "green" : "yellow"}
        />
        <Badge
          name={`Email: ${
            userData?.email_verified_at ? "verified" : "not verified"
          }`}
          color={userData?.email_verified_at ? "green" : "red"}
        />
        <Badge
          name={`KYC: ${userData?.is_verified ? "verified" : "not verified"}`}
          color={userData?.is_verified ? "green" : "yellow"}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <section className="col-span-8 bg-white p-4 rounded-lg shadow-sm">
        <Heading desc="">User Details</Heading>
        <div className="flex my-5 justify-end">
          <button
            onClick={toggleAccountStatus}
            className={`text-white px-3 py-2 rounded-lg text-sm ${
              item.status == "enabled" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {changingStatusLoading ? (
              <i className="bx bx-loader"></i>
            ) : (
              <span>
                {item.status == "enabled"
                  ? "Disable account"
                  : "Enable account"}
              </span>
            )}
          </button>
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-start gap-3 rounded-full pd-1 ">
            {["Info", "KYC Application", "Transactions"].map((tab) => (
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
            {["Info", "KYC Application", "Transactions"].map((tab, idx) => (
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
      <section className="col-span-4 flex flex-col gap-5">
        {_renderUserCard(item)}
      </section>
    </div>
  );
};

export default UserDetails;
