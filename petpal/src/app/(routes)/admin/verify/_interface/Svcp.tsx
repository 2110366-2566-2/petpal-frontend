export interface TimeSlot {
  timeslotID: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface Service {
  serviceID: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  serviceImg: string;
  averageRating: number;
  requireCert: boolean;
  timeslots: TimeSlot[];
  price: number;
}

export interface ServiceProvider {
  IndividualID: string;
  SVCPID: string;
  SVCPImg: string;
  SVCPUsername: string;
  SVCPPassword: string;
  SVCPEmail: string;
  isVerified: boolean;
  SVCPResponsiblePerson: string;
  defaultBank: string;
  defaultAccountNumber: string;
  license: string;
  address: string;
  phoneNumber: string;
  description: string;
  SVCPAdditionalImg: string;
  SVCPServiceType: string;
  services: Service[];
}
