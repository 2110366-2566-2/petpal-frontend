import { Service } from "@/app/_interface/service/service";
import ServiceInterface, { adaptorServiceToServiceInterface } from "./ServiceInterface";
import { exampleServiceType1, exampleServiceType2 } from "./ServiceInterface";
import { Svcp } from "@/app/_interface/svcp/svcp";

export default interface ServiceProviderInterface {
    Name: string,
    Rating: number,
    Description: string,
    Address: string,
    PhoneNumber: string,
    ServiceList: ServiceInterface[],
}

export const exampleProvider: ServiceProviderInterface = {
    Name: "Provider Name",
    Rating: 2.5,
    Description: "For business description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac quam lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis egestas odio non neque scelerisque, ut dignissim nisi vehicula. Aenean porta nunc enim, cursus maximus tellus hendrerit id.",
    Address: "61 Wireless Road , Lumpini, Pathumwan The Athenee Hotel, Bangkok 10330 Thailand",
    PhoneNumber: "0987654321",
    ServiceList: [
        exampleServiceType1, exampleServiceType2, exampleServiceType1, exampleServiceType2
    ]
}


export function adaptorSvcpToServiceProviderInterface(response: Svcp) {
    const name: string = response.SVCPUsername as string
    const Rating: number = 1.5 as number
    const Description: string = response.description as string
    const Address: string = response.address as string
    const PhoneNumber: string = response.phoneNumber as string
    const serviceBeforeAdaptive: Service[] = response.services!
    const ServiceList: ServiceInterface[] = serviceBeforeAdaptive.map((service: Service) => adaptorServiceToServiceInterface(service))

    const result: ServiceProviderInterface = {
        Name: name,
        Rating: Rating,
        Description: Description,
        Address: Address,
        PhoneNumber: PhoneNumber,
        ServiceList: ServiceList
    }
    return result
}