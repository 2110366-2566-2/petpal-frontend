import React from "react";

export default function SkeletonList() {
  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center bg-darkgray w-[327px] xl:w-[100%] mb-4 p-[18px] xl:gap-[66px] rounded-xl drop-shadow-lg">
            <div className="flex flex-col xl:flex-row xl:justify-between">
              <div className="flex justify-between xl:justify-start items-center w-full xl:w-auto space-x-2 xl:mr-[90px]">
                <div className="font-bold text-[24px] xl:hidden text-gray bg-gray rounded-sm animate-pulse">
                  serviceName
                </div>
                <div className="flex flex-col font-medium text-[18px] xl:min-w-[170px] text-gray bg-gray rounded-sm animate-pulse">
                  BookingStatus
                </div>
              </div>
              <div className="mt-2 xl:mt-0 xl:flex xl:items-center xl:justify-start xl:w-auto">
                <div className="text-left">
                  <div className="font-bold text-[24px] hidden xl:block text-gray bg-gray rounded-sm mb-1 animate-pulse">
                    serviceName
                  </div>
                  <div className="font-bold text-[18px] text-gray bg-gray rounded-sm animate-pulse">
                    SVCPName
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium text-[24px] xl:mr-[20px] text-gray bg-gray rounded-sm animate-pulse">
                Feb 30, 2099
              </div>
              <div className="font-medium text-[24px] text-gray bg-gray rounded-sm animate-pulse">
                88:88 - 88:88
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-medium text-[32px] text-gray bg-gray rounded-sm animate-pulse">
                88.88฿
              </div>
              <div className="flex xl:hidden">
                <div className="font-bold text-[16px] text-gray bg-gray rounded-sm mb-1 animate-pulse">
                  Reschedule
                </div>
                <div className="font-bold text-[16px] ml-3 text-gray bg-gray rounded-sm mb-1 animate-pulse">
                  Cancel
                </div>
              </div>
            </div>
            <div>
              <div className="hidden xl:flex">
                <div className="font-bold text-[16px] text-gray bg-gray rounded-sm mb-1 animate-pulse">
                  Reschedule
                </div>
                <button>
                  <div className="font-bold text-[16px] ml-3 text-gray bg-gray rounded-sm mb-1 animate-pulse">
                    Cancel
                  </div>
                </button>
              </div>
              <div className="text-right font-semibold text-[16px] text-gray bg-gray rounded-sm animate-pulse">
                Write Feedback
              </div>
            </div>
          </div>
    </div>
  );
}
