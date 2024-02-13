export default interface ServiceInterface{
    Name:string,
    Type:string,
    StartDate:Date,
    EndDate:Date,
    Price:number
}

export var exampleServiceType1:ServiceInterface = {
    Name:"serviceName1",
    Type:"type1",
    StartDate:new Date(),
    EndDate:new Date(),
    Price:500,
  }

export var exampleServiceType2:ServiceInterface = {
    Name:"serviceName2",
    Type:"type2",
    StartDate:new Date(),
    EndDate:new Date(),
    Price:5000,
  }