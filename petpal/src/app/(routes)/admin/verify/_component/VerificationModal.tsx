import React from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  SVCPUsername: string | null;
  SVCPID: string;
}

export default function VerificationModal({ onClose, SVCPUsername, SVCPID }: Props) {

  const handleConfirm = async () => {
    try {
        const response = await toast.promise(
            fetch(`http://localhost:8080/admin/serviceproviders/verify/${SVCPID}`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({
                    "verify": true
                  })
            }),
            {
                loading: "Verifying service provider...",
                success: "Service provider verified!",
                error: "Error verifying service provider"
            }
        );
        console.log(response);
        // Close the modal after 
        setTimeout(() => {
            onClose();
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error("Error verifying: ", error);
    }
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
            className="py-2 px-5 bg-[#00FF00] text-white hover:bg-white hover:text-[#00FF00] font-semibold rounded-lg shadow-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="py-2 px-5 bg-white text-[#FF0000] hover:bg-[#FF0000]  hover:text-white font-semibold rounded-lg shadow-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
