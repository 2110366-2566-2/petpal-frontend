import { Service } from "@/app/_interface/service/service"
import { Timeslot } from "@/app/_interface/service/timeslot"

export default interface ServiceInterface {
  Name: string,
  Type: string,
  StartDate: Date,
  EndDate: Date,
  Price: number
}

export var exampleServiceType1: ServiceInterface = {
  Name: "serviceName1",
  Type: "type1",
  StartDate: new Date(),
  EndDate: new Date(),
  Price: 500,
}

export var exampleServiceType2: ServiceInterface = {
  Name: "serviceName2",
  Type: "type2",
  StartDate: new Date(),
  EndDate: new Date(),
  Price: 5000,
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
  const StartDate: Date = new Date(selectedTimeSlot.startTime as string)
  const EndDate: Date = new Date(selectedTimeSlot.endTime as string)
  const Price: number = service.price as number

  const result: ServiceInterface = {
    Name: Name,
    Type: Type,
    StartDate: StartDate,
    EndDate: EndDate,
    Price: Price,
  }
  return result
}