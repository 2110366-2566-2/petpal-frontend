import {deleteBank, getCurrentEntity, setdefaultBank} from '@/app/libs/userBackend';
import BankEditInformation from './BankEditInformation';
import BankButton from './BankButton';
import { LoginApi } from '@/app/libs/userBackend';
import { setCookie } from "cookies-next";

export default async function FetchBankInformation(){
    
    // const [deleteReq , setdeleteReq] = useState("")
    // const [userInfo , setUserInfo] = useState(null)
    // const [haveBank , setHaveBank] = useState(false)
    // const [defAccount , setDefAccount] = useState("")
    // const [defBank , setDefBank] = useState("")

    // useEffect(() => {

    //     const fetchCurrentEntity = async () => {
    //       const entity = await getCurrentEntity()
    //       setUserInfo(entity)
    //     };
    //     fetchCurrentEntity();
    // } , [])
    
    // const login = async () =>{
    //     return await LoginApi()
    // }
    // const getentity = async() =>{
    //     return await getCurrentEntity(login())
    // }
    // const entity = getentity()

    const LogData = await LoginApi()
    setCookie("token",LogData?.data.AccessToken);
    console.log("logdata from login",LogData)
    const entity =await getCurrentEntity()
    // // const entity = {defaultAccountNumber:"1",defaultBank:"2"}
    console.log("in", entity)

    // const bankMap = new Map(Object.entries(entity))
    // const haveBank =  bankMap.get('defaultAccountNumber') != '' && bankMap.get('defaultBank') != ''
    // const defAccount = bankMap.get('defaultAccountNumber')
    // const defBank = bankMap.get('defaultBank') 

    // if(!userInfo){
    //     return(<p>loading bank....</p>)
    // }else{
    //     const bankMap = new Map(Object.entries(userInfo))
    //     setHaveBank(bankMap.get('defaultAccountNumber') != '' && bankMap.get('defaultBank') != '')
    //     setDefAccount(String(bankMap.get('defaultAccountNumber')))
    //     setDefBank(String(bankMap.get('defaultBank')))
    // }

    let banks = [
        {id:0 , name : "None"},
        {id: 1 , name: "Kasikorn"},
        {id: 2 , name: "Krungthai"},
        {id: 3 , name: "SCB"}
    ]
    const haveBank = true;
    console.log(haveBank)
    const defAccount = ""
    const defBank = ""

    const handleDeleteButton = async() =>{
        // const response = await deleteBank(userInfo)
        // setdeleteReq(response.message)
    }

    interface BButtonProps{
        Reqmethod:(params:any) => any,
        Log:any
        // Name:String
    }
    // var deletefunction:BButtonProps = {
    //     Reqmethod: deleteBank,
    //     Log:fetchLoginData,
    // }

    return (
        <div className = "my-2">
            <span className='text-black font-bold text-[20px]'>Bank Account</span>
            {haveBank && 
            <div className="Added bank account">
                <div className='accountNumber'> 
                    <span className='text-black font-bold text-[16px]'>Accout Number</span>
                    <div>
                    <span>{String(defAccount)}</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-black font-bold text-[16px]'>Bank Name</span>
                    <div>
                    <span>{String(defBank)}</span>
                    </div>
                </div>
                {/* <BankButton Req={deletefunction}/> */}
            </div>
            }
            {!haveBank && 
            <div>   
                <span className='text-black font-bold text-[16px]'>No Default Bank Account</span>
            </div>
                // <BankEditInformation Log = {fetchLoginData}/>
            }
        </div>

    );
}