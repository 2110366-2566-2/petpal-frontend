import BackArrow from "../_src/BackArrow.png";
// import { ReactComponent as MySuperCustomIconComponent } from '../_src/vector.svg';
export default function HeaderChatComponent() {
  return (
    <div className="bg-[#FFFFFF] w-[100%] h-[75px] m-auto items-center p-[20px] md:pt-[0px] md:hidden">
      <div className="flex m-auto flex-row space-x-[20px]">
        <img src={BackArrow.src} alt="arrow" className="h-[24px] w-[24px] my-auto" />
        <h1 className="text-[24px]">Chats</h1>
      </div>
    </div>
  );
}
