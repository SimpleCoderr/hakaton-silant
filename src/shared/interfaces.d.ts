export interface IMachineForAnonimous {
    serialNumber: string,
    techModel: string,
    engineModel: string,
    engineSerialNumber: string,
    transModel: string,
    transSerialNumber: string,
    driveAxleModel: string,
    driveAxleSerialNumber: string,
    controlBridgeModel: string,
    controlBridgeSerialNumber: string
}

export interface IMachineForAnonimousData {
    entity: IMachineForAnonimous;
    fields: string[];
}

export interface IQueryData<T> {
    errorCode: number,
    errorMessage: null | string,
    resultData: T
}

export interface ISerialsNumberData {
    numbers: string[]
}

export interface ILoginData {
    accessToken: string;
    refreshToken: string;
}