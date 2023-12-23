import {
  EComplaintProperties,
  EMachineProperties,
  ETechInspectionProperties,
} from 'shared/enums';

export interface IMachineForAnonimous {
  serialNumber: string;
  techModel: string;
  engineModel: string;
  engineSerialNumber: string;
  transModel: string;
  transSerialNumber: string;
  driveAxleModel: string;
  driveAxleSerialNumber: string;
  controlBridgeModel: string;
  controlBridgeSerialNumber: string;
}

export interface IMachin {
  serialNumber: string;
  techModel: string;
  engineModel: string;
  engineSerialNumber: string;
  transModel: string;
  transSerialNumber: string;
  driveAxleModel: string;
  driveAxleSerialNumber: string;
  controlBridgeModel: string;
  controlBridgeSerialNumber: string;
  factoryDateShipment: string;
  client: string;
  consumer: string;
  deliveryAddress: string;
  equipment: string;
  company: string;
}

export interface ITechInspection {
  id: string;
  carId: string;
  type: string;
  maintenanceDate: string;
  operating: number;
  orderNumber: string;
  orderNumberDate: string;
  company: string;
}

export interface IComplaint {
  id: string;
  carId: string;
  rejectDate: string;
  operating: number;
  rejectNode: string;
  rejectDescription: string;
  recoveryMethod: string;
  sparePartsUsed: string;
  recoveryDate: string;
  equipmentDowntime: number;
  company: string;
}

export interface IComplaintsData {
  entities: IComplaint[];
  fields: (keyof typeof EComplaintProperties)[];
  totalElements: number;
  totalPages: number;
}

export interface IComplaintData {
  entity: IComplaint;
  fields: (keyof typeof EComplaintProperties)[];
}

export interface ITechInspectionsData {
  entities: ITechInspection[];
  fields: (keyof typeof ETechInspectionProperties)[];
  totalElements: number;
  totalPages: number;
}

export interface ITechInspectionData {
  entity: ITechInspection;
  fields: (keyof typeof ETechInspectionProperties)[];
}

export interface IMachinesData {
  entities: IMachin[];
  fields: (keyof typeof EMachineProperties)[];
  totalElements: number;
  totalPages: number;
}

export interface IMachineData {
  entity: IMachin;
  fields: (keyof typeof EMachineProperties)[];
}

export interface IMachineForAnonimousData {
  entity: IMachineForAnonimous;
  fields: string[];
}

export interface IQueryData<T> {
  errorCode: number;
  errorMessage: null | string;
  resultData: T;
}

export interface ISerialsNumberData {
  numbers: string[];
}

export interface ILoginData {
  accessToken: string;
  refreshToken: string;
}

export type TIRole =
  | 'ROLE_MANAGER'
  | 'ROLE_CLIENT'
  | 'ROLE_ADMIN'
  | 'SERVICE_ORGANISATION';

export interface IToken {
  role: TIRole;
  sub: string;
  company?: string;
}

export interface ICompany {
  name: string;
  description: string;
}

export interface IDirectory {
  name: string;
  description: string | null;
}

export interface IInfoItem {
  title: string;
  name: string;
}
