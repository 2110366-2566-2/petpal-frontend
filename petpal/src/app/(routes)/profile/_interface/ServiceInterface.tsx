import { Service } from "@/app/_interface/service/service"
import { Timeslot } from "@/app/_interface/service/timeslot"

export default interface ServiceInterface {
  Name: string,
  Type: string,
  StartDate: Date,
  EndDate: Date,
  Price: number,
  ServiceID: string
}

export var exampleServiceType1: ServiceInterface = {
  Name: "serviceName1",
  Type: "type1",
  StartDate: new Date(),
  EndDate: new Date(),
  Price: 500,
  ServiceID: "66023ef2b7f4d2ad422538b4"
}

export var exampleServiceType2: ServiceInterface = {
  Name: "serviceName2",
  Type: "type2",
  StartDate: new Date(),
  EndDate: new Date(),
  Price: 5000,
  ServiceID: "66023ef2b7f4d2ad422538b5"
}


export function adaptorServiceToServiceInterface(service: Service): ServiceInterface {
  const Name: string = service.serviceName as string
  const Type: string = service.serviceType as string
  let selectedTimeSlot: Timeslot = {
    endTime: "",
    startTime: ""
  }
  if (service.timeslots![0] !== undefined) {
    selectedTimeSlot = service.timeslots![0] as Timeslot
  }
  const offset = new Date().getTimezoneOffset();
  let StartDate: Date = new Date(selectedTimeSlot.startTime as string)
  StartDate.setTime(StartDate.getTime() + offset * 60000)
  let EndDate: Date = new Date(selectedTimeSlot.endTime as string)
  EndDate.setTime(EndDate.getTime() + offset * 60000)
  const Price: number = service.price as number
  const ServiceID = service.serviceID as string

  const result: ServiceInterface = {
    Name: Name,
    Type: Type,
    StartDate: StartDate,
    EndDate: EndDate,
    Price: Price,
    ServiceID: ServiceID
  }
  return result
}