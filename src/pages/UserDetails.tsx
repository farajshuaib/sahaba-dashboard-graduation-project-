import { Tab } from "@headlessui/react";
import { useWeb3React } from "@web3-react/core";
import EmptyData from "components/EmptyData";
import Labeled from "components/Labeled";
import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "constant";
import { Contract } from "ethers";
import { Dropdown, Table, Tabs } from "flowbite-react";
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
import logo_light from "../assets/logo_light.svg";
import Pagination from "shared/Pagination/Pagination";
import ReportsTable from "components/ReportsTable";
import NftsTable from "components/NftsTable";
import TransactionsTable from "components/TransactionsTable";
import { getUserSlug } from "utils/functions";

const RenderTabUserTransactions = (userData: UserData) => {
  const { fetch, loading, data, meta, errors } = useCrud(`/transactions`);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page, from: userData?.id });
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

const _renderTabUserDetails = (userData: UserData) => (
  <section className="my-8">
    <Labeled title="Wallet address" value={userData?.wallet_address} />
    <div className="grid grid-cols-2 gap-5 my-8 md:grid-cols-2">
      <Labeled title="First name" value={userData?.first_name} />
      <Labeled title="Last name" value={userData?.last_name} />
      <Labeled title="Banner photo" preview value={userData?.banner_photo} />
      <Labeled title="Profile photo" preview value={userData?.profile_photo} />
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
        preview
        title="Facebook page"
        value={`${userData?.social_links?.facebook_url}`}
      />
      <Labeled
        preview
        title="Twitter page"
        value={`${userData?.social_links?.twitter_url}`}
      />
      <Labeled
        preview
        title="Telegram page"
        value={`${userData?.social_links?.telegram_url}`}
      />
      <Labeled
        title="Website page"
        preview
        value={`${userData?.social_links?.website_url}`}
      />
      <Labeled
        title="Instagram page"
        preview
        value={`${userData?.social_links?.instagram_url}`}
      />
    </div>
  </section>
);

const RenderKYCApplication = (userData: UserData) => {
  const api = useApi();
  const [changeStatusLoading, setChangeStatusLoading] =
    useState<boolean>(false);

  const changeKYCStatus = async (status: string) => {
    try {
      setChangeStatusLoading(true);
      const { data } = await api.post(
        `/kyc/change-account-status/${userData.kyc_form.id}`,
        { status }
      );
      toast.success(data.message);
      setChangeStatusLoading(false);
    } catch (error: any) {
      setChangeStatusLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {userData.kyc_form ? (
        <div>
          <section className="flex  my-5 gap-5 justify-end">
            <Badge
              color={
                userData?.kyc_form?.status == "approved"
                  ? "green"
                  : userData?.kyc_form?.status == "pending"
                  ? "yellow"
                  : userData?.kyc_form?.status == "rejected"
                  ? "red"
                  : userData?.kyc_form?.status == "on_review"
                  ? "blue"
                  : "gray"
              }
              name={userData.kyc_form?.status}
            />
          </section>
          <section className="grid grid-cols-2 gap-5 my-8 md:grid-cols-2">
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
            <Labeled
              title="Passport id"
              preview
              value={userData?.kyc_form?.passport_id}
            />

            <Labeled title="Address" value={userData?.kyc_form?.passport_id} />
          </section>
          <section className="flex  my-5 gap-5 justify-end">
            <Dropdown
              label={changeStatusLoading ? "loading..." : "change status"}
            >
              <Dropdown.Item onClick={() => changeKYCStatus("approved")}>
                approved
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeKYCStatus("rejected")}>
                rejected
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeKYCStatus("pending")}>
                pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeKYCStatus("on_review")}>
                on_review
              </Dropdown.Item>
            </Dropdown>
          </section>
        </div>
      ) : (
        <EmptyData />
      )}
    </>
  );
};

const RenderOwnedNfts: React.FC = () => {
  const params = useParams();
  const { data, fetch, loading, errors, meta } = useCrud(
    `/nfts?owner=${params.id}`
  );
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page });
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
      <NftsTable nfts={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const RenderCreatedNfts: React.FC = () => {
  const params = useParams();
  const { data, fetch, loading, errors, meta } = useCrud(
    `/nfts?creator=${params.id}`
  );
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page });
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
      <NftsTable nfts={data} />
      {meta && <Pagination setPage={(p) => setPage(p)} meta={meta} />}
    </div>
  );
};

const RenderUserReports: React.FC = () => {
  const { data, loading, fetch, errors, meta } = useCrud(`/reports`);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch({ page, reportable: "User" });
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

const UserDetails: React.FC = () => {
  const params = useParams();
  const api = useApi();
  const { fetchById, loading, item, errors } = useCrud(`/users`);
  const [changingStatusLoading, setChangingStatusLoading] = useState(false);
  const navigate = useNavigate();
  const [accountTotalBalance, setAccountTotalBalance] = useState(0);
  const { library, active, account } = useWeb3React();

  useEffect(() => {
    if (!params.id) {
      navigate("/users");
      toast.warn("user not found...");
      return;
    }
    fetchById(params.id);
  }, []);

  const getAccountTotalBalance = async () => {
    try {
      if (!active || !item) return;
      const contract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        library?.getSigner()
      );

      const balance = await contract.getTotalNumberOfTokensOwnedByAnAddress(
        item.wallet_address
      );
      setAccountTotalBalance(+balance.toString());
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountTotalBalance();
  }, [active, item, account]);

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
      const { data } = await api.put(`/users/toggle-status/${item.id}`);
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
      case "Owned NFTs":
        return <RenderOwnedNfts />;
      case "Created NFTs":
        return <RenderCreatedNfts />;
      case "Reports":
        return <RenderUserReports />;
      default:
        return <></>;
    }
  };

  const _renderUserCard = (userData: UserData) => (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar sizeClass="w-24 h-24" imgUrl={userData?.profile_photo} />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl">{getUserSlug(userData)}</h4>
          <h6 className="text-sm text-gray-600">{userData?.email || "-"}</h6>
        </div>
      </div>
      <p className="my-3">{userData?.bio}</p>
      <div className="flex flex-wrap items-center gap-3 my-2">
        <Badge
          name={`Account: ${userData?.status}`}
          color={userData?.status == "active" ? "green" : "red"}
        />
        <Badge
          name={`Email: ${
            userData?.email_verified_at ? "verified" : "not verified"
          }`}
          color={userData?.email_verified_at ? "green" : "red"}
        />
        <Badge
          name={`KYC: ${userData?.kyc_form?.status}`}
          color={
            userData?.kyc_form?.status == "approved"
              ? "green"
              : userData?.kyc_form?.status == "pending"
              ? "yellow"
              : userData?.kyc_form?.status == "rejected"
              ? "red"
              : userData?.kyc_form?.status == "on_review"
              ? "blue"
              : "gray"
          }
        />
      </div>
    </div>
  );

  const _renderAccountBalance = () => (
    <div className="flex items-center gap-4 p-5 text-white rounded-lg bg-primary-700">
      <img src={logo_light} alt="sahaba" className="h-24" />
      <div className="">
        <h5 className="text-xl font-medium uppercase">total balance</h5>
        <span>{accountTotalBalance} NFTs</span>
      </div>
    </div>
  );

  const Tabs = [
    "Info",
    "KYC Application",
    "Transactions",
    "Reports",
    "Created NFTs",
    "Owned NFTs",
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <section className="col-span-8 p-4 bg-white rounded-lg shadow-sm">
        <Heading desc="">User Details</Heading>
        <div className="flex justify-end my-5">
          <button
            onClick={toggleAccountStatus}
            className={`text-white px-3 py-2 rounded-lg text-sm ${
              item.status == "active" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {changingStatusLoading ? (
              <i className="bx bx-loader"></i>
            ) : (
              <span>
                {item.status == "active"
                  ? "Suspend account"
                  : "Activate account"}
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
        {_renderUserCard(item)}
        {_renderAccountBalance()}
      </section>
    </div>
  );
};

export default UserDetails;
