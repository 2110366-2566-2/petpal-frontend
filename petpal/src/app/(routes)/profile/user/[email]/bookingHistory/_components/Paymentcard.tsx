import React from 'react'
import Image, { StaticImageData } from 'next/image'
import toast from 'react-hot-toast';

interface Props {
    onClose: () => void;
    qrCode: string | null;
    bookingID: string | null;
    serviceName: string | null;
}

export default function Paymentcard({onClose, qrCode, bookingID, serviceName}:Props){ 
    const qr : StaticImageData ={
		src: `data:image/png;base64,${qrCode}`,
		height: 256,
		width: 256
	}

	const handleConfirmPayment = async () => {
		try {
			const response = await toast.promise(
				fetch("http://localhost:8080/service/booking/payment/authorize", {
					method: "POST",
					credentials: "include",
					body: JSON.stringify({ bookingID: bookingID }) // Correct body format
				}),
				{
					loading: "Confirming payment...",
					success: "Payment confirmed!",
					error: "Error confirming payment"
				}
			);
	
			const data = await response.json();
			// Check payment status in the response data
			if (data.status && data.status.paymentStatus) {
				console.log("Payment successful");
				// Additional handling if payment is successful
			} else {
				console.log("Payment failed");
				// Additional handling if payment fails
			}
			// Close the Paymentcard modal after payment confirmation
			setTimeout(() => {
				onClose();
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error("Error confirming payment:", error);
		}
	};
	
	


  return (
    <main className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black opacity-75 cursor-default"
			/>
			<div className="relative w-[90%] max-w-[375px] max-h-[90%] bg-gray rounded-3xl px-6">
				<div className="flex justify-between items-start">
					<button
						className="absolute top-2.5 right-2.5 text-6xl h-6 w-6 text-black opacity-30 rounded justify-center items-center flex pb-0.5"
						onClick={()=>{onClose; window.location.reload();}}
					>
						&times;
						<span className="sr-only">Close Modal</span>
					</button>
				</div>
				<div className="bg-white rounded-lg mx-2 my-3 mt-8 max-w-3xl space-y-4 overflow-auto z-20 shadow-md">
					<div className="flex justify-center text-2xl text-center w-full shadow-md rounded-t-lg py-2 bg-[#0050AE] text-white font-semibold">
						Thai QR Payment
					</div>
					<div className="max-w-[375px] flex flex-col items-center">
						<div className="aspect-square w-[90%] relative bg-white rounded-lg shadow-md">
						{qrCode!='/loadingcar.jpg' ? (
							<a
								href={`data:image/png;base64,${qrCode}`}
								download={`petpal_qrpayment_${bookingID}.png`}
							>
								<Image
									alt="QR code"
									className="object-cover w-full rounded-lg border-2 border-gray overflow-hidden"
									placeholder="blur"
									blurDataURL={'/loadingcar.jpg'}
									src={qr}
								/>
							</a>
							) : (
							<Image
								alt="Placeholder image"
								className="object-cover w-full rounded-lg border-2 border-gray overflow-hidden"
								src="/loadingcar.jpg" // Replace 'placeholder.png' with your specific PNG file
								width={256}
								height={256}
							/>
						)}
						</div>
						<div className="flex flex-col justify-center text-gray-500 text-xs mt-1">
                    		<span>Booking ID: {bookingID}</span>
							<span>Service name: {serviceName} </span>
                		</div>
						<div className="flex flex-col gap-3 p-3 opacity-80">
							<span className="inline-block bg-blue-200 text-blue-800 text-lg rounded-full font-medium tracking-wide">
                                1. Click to save this QR
							</span>
                            <span className="inline-block bg-blue-200 text-blue-800 text-lg rounded-full font-medium tracking-wide">
                                2. Open your online banking
							</span>
                            <span className="inline-block bg-blue-200 text-blue-800 text-lg rounded-full font-medium tracking-wide">
                                3. Select menu scan QR
							</span>
                            <span className="inline-block bg-blue-200 text-blue-800 text-lg rounded-full font-medium tracking-wide">
                                4. Scan this QR code
							</span>
                            
						</div>
					</div>
				</div>
				<div className="pb-3 px-3 flex justify-center">
					{(qrCode!='/loadingcar.jpg' && bookingID) ? (
							<button 
								className="py-2 px-5 bg-[#FF872F] text-white hover:bg-white hover:text-orange font-semibold rounded-full shadow-md hover:bg-orange-500 
										focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75"
								onClick={handleConfirmPayment} // Pass bookingID to onConfirm function
							>
								Confirm payment
							</button>
							) : (
							<button 
								className="py-2 px-5 bg-white text-gray font-semibold rounded-full shadow-md"
								onClick={() => toast.error('QR is undefined')}
							>
								Confirm payment
							</button>
						)}
				</div>
			</div>
		</main>
  )
}
