import ServiceInterface from "./ServiceInterface";

export default interface ServiceProviderInterface{
    Name:string,
    Rating:number,
    Description:string,
    Address:string,
    PhoneNumber:string,
    ServiceList:ServiceInterface[],
}