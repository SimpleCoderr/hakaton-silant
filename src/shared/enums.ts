export enum EMachineProperties {
  serialNumber = 'Зав. № машины',
  techModel = 'Модель техники',
  engineModel = 'Модель двигателя',
  engineSerialNumber = 'Зав. № двигателя',
  transModel = 'Модель трансмиссии',
  transSerialNumber = 'Зав. № трансмиссии',
  driveAxleModel = 'Модель ведущего моста',
  driveAxleSerialNumber = 'Зав. № ведущего моста',
  controlBridgeModel = 'Модель управл. моста',
  controlBridgeSerialNumber = 'Зав. № управл. моста',
  factoryDateShipment = 'Дата отгрузки',
  client = 'Клиент',
  consumer = 'Заказчик',
  deliveryAddress = 'Адрес поставки',
  equipment = 'Комплектация',
  company = 'Компания',
}

export enum ETechInspectionProperties {
  id = '',
  carId = 'Машина',
  type = 'Вид ТО',
  maintenanceDate = 'Дата проведения ТО',
  operating = 'Наработка, м/час',
  orderNumber = 'Номер заказ-наряда',
  orderNumberDate = 'Дата заказ-наряда',
  company = 'Организация, проводившая ТО',
}

export enum EComplaintProperties {
  id = '',
  'carId' = 'Машина',
  'rejectDate' = 'Дата отказа',
  'operating' = 'Наработка, м/час',
  'rejectNode' = 'Узел отказа',
  'rejectDescription' = 'Описание отказа',
  'recoveryMethod' = 'Способ восстановления',
  'sparePartsUsed' = 'Используемые запасные части',
  'recoveryDate' = 'Дата восстановления',
  'equipmentDowntime' = 'Время простоя техники',
  'company' = 'Сервисная компания',
}

export enum ScreenBreakpoints {
  SCREEN_360 = 360,
  SCREEN_576 = 576,
  SCREEN_768 = 768,
  SCREEN_992 = 992,
  SCREEN__1200 = 1200,
  SCREEN_1366 = 1366,
  SCREEN_1440 = 1440,
  SCREEN_1536 = 1536,
}
