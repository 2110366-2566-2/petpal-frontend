import { Service } from "@/app/_interface/service/service";
import ServiceInterface, { adaptorServiceToServiceInterface } from "./ServiceInterface";
import { exampleServiceType1, exampleServiceType2 } from "./ServiceInterface";
import { Svcp } from "@/app/_interface/svcp/svcp";

const mockProfilePicuture: string = "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"


export default interface ServiceProviderInterface {
    Name: string,
    profileImage: string,
    Rating: number,
    Description: string,
    additionalImage: string,
    Address: string,
    PhoneNumber: string,
    ServiceList: ServiceInterface[],
}

export const exampleProvider: ServiceProviderInterface = {
    Name: "Provider Name",
    profileImage: mockProfilePicuture,
    Rating: 2.5,
    Description: "For business description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac quam lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis egestas odio non neque scelerisque, ut dignissim nisi vehicula. Aenean porta nunc enim, cursus maximus tellus hendrerit id.",
    additionalImage: mockProfilePicuture,
    Address: "61 Wireless Road , Lumpini, Pathumwan The Athenee Hotel, Bangkok 10330 Thailand",
    PhoneNumber: "0987654321",
    ServiceList: [
        exampleServiceType1, exampleServiceType2
    ]
}


export function adaptorSvcpToServiceProviderInterface(response: Svcp) {
    const name: string = response.SVCPUsername as string
    const profileImage: string = response.SVCPImg as string
    const additionalImage: string = response.SVCPAdditionalImg as string
    const Rating: number = 1.5 as number
    const Description: string = response.description as string
    const Address: string = response.address as string
    const PhoneNumber: string = response.phoneNumber as string
    const serviceBeforeAdaptive: Service[] = response.services!
    const ServiceList: ServiceInterface[] = serviceBeforeAdaptive.map((service: Service) => adaptorServiceToServiceInterface(service))

    const result: ServiceProviderInterface = {
        Name: name,
        profileImage: profileImage,
        Rating: Rating,
        Description: Description,
        additionalImage: additionalImage,
        Address: Address,
        PhoneNumber: PhoneNumber,
        ServiceList: ServiceList
    }
    return result
}