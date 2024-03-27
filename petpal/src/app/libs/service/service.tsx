import { getCurrentEntity } from "../user/userBackend";

// type Service struct {
// 	ServiceID          string     `json:"serviceID" bson:"serviceID,omitempty"`
// 	ServiceName        string     `json:"serviceName" bson:"serviceName"`
// 	ServiceType        string     `json:"serviceType" bson:"serviceType"`
// 	ServiceDescription string     `json:"serviceDescription" bson:"serviceDescription"`
// 	ServiceImg         []byte     `json:"serviceImg" bson:"serviceImg"`
// 	AverageRating      float64    `json:"averageRating" bson:"averageRating"`
// 	RequireCert        bool       `json:"requireCert" bson:"requireCert"`
// 	Timeslots          []Timeslot `json:"timeslots" bson:"timeslots"`
// 	Price              float64    `json:"price" bson:"price"`
// }
interface Timeslot {
    startTime: string;
    endTime: string;
}

interface Service {
    serviceID: string;
    serviceName: string;
    serviceType: string;
    serviceDescription: string;
    serviceImg: Uint8Array;
    averageRating: number;
    requireCert: boolean;
    timeslots: Timeslot[];
    price: number;
}

export default async function get_service_by_id(id : string){
    // get current entity and wait for the response

    let current_entity;

    try {
        current_entity = await getCurrentEntity();
      //  console.log('Current entity:', current_entity);
        if (current_entity.services !== undefined ) {
            //console.log('Services:', current_entity.services);
           // console.log('ID:', id);
            const service = current_entity.services.find((service : Service) => service.serviceID === id);
            return service;
        }
        else {
            // Fetch service from http://localhost:8080/service/id
            const response = await fetch(`http://localhost:8080/service/${id}`);
            if(response.ok){
                return await response.json();
            }else{
                console.error("Failed to Fetch Service Listing");
                try {
                    const errorMessage = await response.text();
                    console.error("Error message:", errorMessage);
                } catch (error) {
                    console.error("Failed to parse error message:", error);
                }
            }
             // Assuming response contains the service data
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
        throw error;
    }
}