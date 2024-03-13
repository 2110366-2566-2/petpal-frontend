export interface TimeslotInterface {
    endTime : string,
    startTime : string,
    status : string,
    timeslotID : string,
}

export interface ServiceInterface {
    averageRating : number,
    price : number,
    requireCert : boolean,
    serviceDescription : string,
    serviceID : string,
    serviceImg : string,
    serviceName : string,
    serviceType : string,
    timeslots : TimeslotInterface[],
}