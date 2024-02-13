export default function BankDefault({bankJson}:{bankJson:Object}){
    const bankMap = new Map(Object.entries(bankJson))
    return(
        <div className="Added bank account">
                { (bankMap.get('defaultAccountNumber') != "Deflut") &&
                     <p>{bankMap.get('defaultAccountNumber')}</p>   
                }
                {   (bankMap.get('defaultBank') != "Deflut") && 
                    <p>{bankMap.get('defaultBank')}</p>
                }
                {/* <button className = 'border-2'type='button' onClick={() => {setIsOpenValue(false)}}>cancle</button> */}
        </div>
    );
}