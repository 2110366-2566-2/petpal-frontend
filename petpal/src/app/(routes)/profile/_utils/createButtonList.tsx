import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import ButtonPropsInterface from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import { chatButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"

export default function createButtonList(isShow: boolean, buttonPropsList: ButtonPropsInterface[], chatOnClick?: () => void) {
  return (
    <>
      {(isShow) ? (
        <div className='space-y-[20px] block'>
          {buttonPropsList.map((buttonProps: ButtonPropsInterface) => <SmallButtonComponent ButtonProps={buttonProps} key={buttonProps.Name}></SmallButtonComponent>)}
        </div>
      ) : (
        <div>
          <SmallButtonComponent ButtonProps={chatButtonProps} key={chatButtonProps.Name} onClick={chatOnClick}></SmallButtonComponent>
        </div>
      )
      }
    </>
  )
}