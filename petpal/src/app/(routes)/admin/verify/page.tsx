"use client";
import React, { useState, useEffect } from "react";
import getUnverified from "./_utils/getUnverified";
import { ServiceProvider } from "./_interface/Svcp";
import VerificationModal from "./_component/VerificationModal";

export default function VerifyPage() {
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(
    []
  );
  const [selectedServiceProvider, setSelectedServiceProvider] =
    useState<ServiceProvider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const serviceProviderData = await getUnverified();
        setServiceProviders(serviceProviderData);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleVerifyClick = (serviceProvider: ServiceProvider) => {
    setSelectedServiceProvider(serviceProvider);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedServiceProvider(null);
  };

  return (
    <div className="flex flex-col items-center gap-y-5 pt-5">
      {serviceProviders != null && (<p className="font-semibold text-[24px]">Unverified service providers</p>)}
      {serviceProviders === null ? (
        <p>No unverified service provider</p>
      ) : (
        serviceProviders.map((serviceProvider) => (
          <div
            key={serviceProvider.SVCPID}
            className="flex flex-col xl:flex-row xl:justify-between xl:items-center bg-[#E8E8E8] w-[327px] xl:w-[82%] mb-4 p-[18px] rounded-xl drop-shadow-lg"
          >
            <div className="flex flex-col xl:flex-row xl:justify-between">
              {/* Mobile: Service Name and Status on one row, centered. Desktop: Status moves to the left. */}
              <div className="flex justify-between xl:justify-start items-center w-full xl:w-auto space-x-2 xl:mr-[90px]">
                <div className="font-semibold text-[20px] xl:hidden cursor-pointer">
                  {serviceProvider.SVCPUsername}{" "}
                </div>
              </div>
              {/* Provider Name: Below on mobile, in a box on the right on desktop */}
              <div className="mt-2 xl:mt-0 xl:flex xl:items-center xl:justify-start xl:w-auto">
                <div className="text-left">
                  <div className="font-semibold text-[20px] hidden xl:block cursor-pointer">
                    {serviceProvider.SVCPUsername}
                    {/* Hidden on Mobile, visible on Desktop */}
                  </div>
                  <span className="font-xs">{serviceProvider.SVCPID}</span>
                </div>
                <button
                  className="absolute right-10 py-2 px-5 bg-[#00FF00] text-white hover:bg-white hover:text-[#00FF00] font-semibold rounded-lg shadow-md"
                  onClick={() => handleVerifyClick(serviceProvider)}
                >
                  verify svcp
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {isModalOpen && selectedServiceProvider && (
        <VerificationModal
          onClose={closeModal}
          SVCPUsername={selectedServiceProvider.SVCPUsername}
          SVCPID={selectedServiceProvider.SVCPID}
        />
      )}
    </div>
  );
}
