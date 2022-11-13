import { useWeb3React } from "@web3-react/core";
import {  utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import useContract from "hooks/useContract";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";

const ServiceFeesCard: React.FC = () => {
  const { account, library, active } = useWeb3React();
  const [serviceFees, setServiceFees] = React.useState<number>(0);
  const [newServiceFees, setNewServiceFees] = React.useState<number>(0);
  const [updateServiceFeesLoading, setUpdateServiceFeesLoading] =
    React.useState<boolean>(false);

  const { contract, isApprovedForAll, setApprovalForAll } = useContract();

  const [toggleUpdateServiceFee, setToggleUpdateServiceFee] =
    React.useState<boolean>(false);

  const fetchPlatformFees = async () => {
    if (!account || !library) {
      return;
    }
    try {
      const res = await contract.getServiceFeesPrice();
      setServiceFees(+utils.formatEther(res).toString());
      setNewServiceFees(+utils.formatEther(res).toString() * 100);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlatformFees = async () => {
    if (!account || !library) {
      return;
    }

    if (newServiceFees < 0 || newServiceFees > 100) {
      toast.error("Please enter a valid service fee percentage");
      return;
    }

    setUpdateServiceFeesLoading(true);

    try {
      if (!isApprovedForAll()) {
        await setApprovalForAll();
      }

      const tx = await contract.setServiceFeesPrice(
        parseEther((newServiceFees / 100).toString())
      );
      await tx.wait();
      await fetchPlatformFees();
      setUpdateServiceFeesLoading(false);
      toast.success("Service fees updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      setUpdateServiceFeesLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlatformFees();
  }, [account, active]);

  return (
    <section className="relative overflow-hidden bg-white shadow-lg sm:rounded-lg col-span-12 lg:col-span-8">
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h6 className="text-xl font-semibold">Platform Service fees</h6>
      </div>
      {!account ? (
        <p className="px-6 py-4 text-sm text-red-500">
          * You need to be connected to your wallet to interact with the
          blockchain.
        </p>
      ) : (
        <div className="px-6 py-4">
          <p className="">
            Platform owner will receive fees on each purchase activity
          </p>

          <div className="flex items-center my-5 gap-3">
            {toggleUpdateServiceFee ? (
              <>
                <div className="relative flex w-full">
                  <span className="inline-flex font-bold items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                    %
                  </span>
                  <Input
                    type="number"
                    value={newServiceFees}
                    min={0}
                    name="serviceFees"
                    max={100}
                    onChange={(e) => {
                      setNewServiceFees(+e.target.value);
                    }}
                    className="!rounded-l-none w-full"
                  />
                </div>
                <ButtonPrimary
                  loading={updateServiceFeesLoading}
                  onClick={updatePlatformFees}
                >
                  conform
                </ButtonPrimary>
              </>
            ) : (
              <h3 className="text-gray-800 text-xl font-bold">
                {serviceFees * 100}%{" "}
                <span className="text-primary-700 text-base">ETH</span>
              </h3>
            )}
          </div>

          <div className="flex justify-end">
            <ButtonSecondary
              onClick={() => setToggleUpdateServiceFee(!toggleUpdateServiceFee)}
              className=""
            >
              {toggleUpdateServiceFee ? "Cancel update" : "update service fees"}
            </ButtonSecondary>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceFeesCard;
