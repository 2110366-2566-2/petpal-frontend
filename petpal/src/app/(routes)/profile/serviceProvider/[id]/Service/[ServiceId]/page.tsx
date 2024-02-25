import Image from "next/image";
import defaultImage from "./cat.png";
export default function BookAppointment() {
    return (
        <main>
            <div className="w-[300px] md:w-[700px]">
                <Image
                    src="/cat.png"
                    alt="PP"
                    width="800"
                    height={0}
                    className="rounded-xl"
                />
            </div>
        </main>
    );
}
