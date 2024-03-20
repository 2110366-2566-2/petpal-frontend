import BackArrow from "@app/(routes)/chat/_src/BackArrow.png";
// import { ReactComponent as MySuperCustomIconComponent } from '../_src/vector.svg';
export default function HeaderChatComponent({ Text }: { Text: string }) {
  var HeaderText: string = Text
  return (
    <div className="bg-[#FFFFFF] w-[100%] h-[75px] m-auto items-center p-[20px] md:pt-[0px] md:hidden">
      <div className="flex m-auto flex-row space-x-[20px]">
        <img src={BackArrow.src} alt="arrow" className="h-[24px] w-[24px] my-auto" />
        <h1 className="text-[24px] m-auto">{HeaderText}</h1>
      </div>
    </div>
  );
}
