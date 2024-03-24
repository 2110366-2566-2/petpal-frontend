import React from 'react'
import Image from 'next/image'

interface Props {
    onClose: () => void;
}

export default function Paymentcard({onClose}:Props){ 
    const qr = '/sampleqr.png';


  return (
    <main className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black opacity-75 cursor-default"
			/>
			<div className="relative w-[90%] max-w-[375px] max-h-[90%] bg-gray rounded-3xl px-6">
				<div className="flex justify-between items-start">
					<button
						className="absolute top-2.5 right-2.5 text-6xl h-6 w-6 text-black opacity-30 rounded justify-center items-center flex pb-0.5"
						onClick={onClose}
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
							<a
                                href={qr}
                                download
                            >
                                <Image
								alt='qr'
								className="object-cover w-full rounded-lg border-2 border-gray overflow-hidden"
								fill={true}
								priority={true}
								loading="eager"
								src={qr}
							    />
                            </a>
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
					<button className="py-2 px-5 bg-[#FF872F] text-white hover:bg-white hover:text-orange font-semibold rounded-full shadow-md hover:bg-orange-500 
                                 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75">
						Confirm payment
					</button>
				</div>
			</div>
		</main>
  )
}
