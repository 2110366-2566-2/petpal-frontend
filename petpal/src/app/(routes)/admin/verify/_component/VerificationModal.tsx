import React, { useState } from "react";

interface Props {
  onClose: () => void;
  SVCPUsername: string | null;
}

export default function VerificationModal({ onClose, SVCPUsername }: Props) {
  const [verificationOption, setVerificationOption] = useState("");

  const handleConfirm = () => {
    // Handle confirmation action, e.g., send verification request
    // Reset any state related to the modal
    onClose();
  };

  const handleCancel = () => {
    // Handle cancellation action
    // Reset any state related to the modal
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 bg-black opacity-75 cursor-default flex items-center justify-center">
      <div className="relative w-[90%] max-w-[375px] min-h-[50%] bg-gray rounded-3xl py-6 flex flex-col items-center justify-between">
        <h2>Verify Service Provider</h2>
        <span className="font-semibold text-[30px] truncate">{SVCPUsername}</span>
        <div className="flex gap-x-8">
          <button
            className="py-2 px-5 bg-[#00FF00] text-white hover:bg-white hover:text-[#00FF00] font-semibold rounded-lg shadow-md hover:bg-orange-500"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="py-2 px-5 bg-white text-[#FF0000] hover:bg-[#FF0000]  hover:text-white font-semibold rounded-lg shadow-md hover:bg-orange-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
