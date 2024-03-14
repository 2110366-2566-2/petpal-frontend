import { getCurrentEntity } from "./userBackend";

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
    const current_entity = await getCurrentEntity()
    console.log('current entity', current_entity)
    console.log('services', current_entity.services)
    console.log('id', id)
  
    const service = current_entity.services.find((service : Service) => service.serviceID === id)

    return service
}