import BackArrow from "../_src/BackArrow.png";
// import { ReactComponent as MySuperCustomIconComponent } from '../_src/vector.svg';
export default function HeaderChatComponent() {
  return (
    <div className="bg-[#FFB57E] w-[100%] h-[75px] m-auto items-center">
      <div className="flex m-auto flex-row space-x-1">
        <img src={BackArrow.src} alt="arrow" />
        <h1>Chat</h1>
      </div>
    </div>
  );
}
