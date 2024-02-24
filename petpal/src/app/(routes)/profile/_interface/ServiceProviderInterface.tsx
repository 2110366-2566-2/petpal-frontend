import ServiceInterface from "./ServiceInterface";
import { exampleServiceType1,exampleServiceType2 } from "./ServiceInterface";

export default interface ServiceProviderInterface{
    Name:string,
    Rating:number,
    Description:string,
    Address:string,
    PhoneNumber:string,
    ServiceList:ServiceInterface[],
}

export var exampleProvider:ServiceProviderInterface = {
    Name:"Provider Name",
    Rating:2.5,
    Description:"For business description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac quam lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis egestas odio non neque scelerisque, ut dignissim nisi vehicula. Aenean porta nunc enim, cursus maximus tellus hendrerit id.",
    Address:"61 Wireless Road , Lumpini, Pathumwan The Athenee Hotel, Bangkok 10330 Thailand",
    PhoneNumber:"0987654321",
    ServiceList:[
        exampleServiceType1,exampleServiceType2,exampleServiceType1,exampleServiceType2
    ]
  }