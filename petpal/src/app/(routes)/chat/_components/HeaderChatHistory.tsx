import BackArrow from "@app/(routes)/chat/_src/BackArrow.png"
import { StaticImageData } from "next/image"
import Image from "next/image";
// import { ReactComponent as MySuperCustomIconComponent } from '../_src/vector.svg';
export default function HeaderChatHistory({ Text, ImgSrc }: { Text: string, ImgSrc: string }) {
    var HeaderText: string = Text
    var showProfileImg: boolean = ImgSrc != ""
    const picutreString: string = ImgSrc.includes("static") ? ImgSrc : `data:image/png;base64, ${ImgSrc}`
    return (
        <div className="bg-[#FFFFFF] w-[100%] h-[75px] m-auto items-center py-[12px] px-[20px] md:px-[0px]">
            <div className="flex m-auto flex-row space-x-[20px]">
                <img src={BackArrow.src} alt="arrow" className="h-[24px] w-[24px] my-auto md:hidden" />
                {(showProfileImg) ? <img src={picutreString} alt="imgProfile" className="h-[60px] w-[60px] my-auto rounded-[30px] md:h-[45px] md:w-[45px]" /> : <></>}
                <h1 className="text-[24px] m-auto">{HeaderText}</h1>
            </div>
        </div>
    );
}
