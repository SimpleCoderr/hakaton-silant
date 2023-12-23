export const getWidth = (tableKey: string) => {
    switch (tableKey) {
    case 'serialNumber':
        return 70;
    case 'techModel':
        return 70;
    case 'engineModel':
        return 80;
    case 'factoryDateShipment':
        return 80;
    case 'equipment':
        return 200;
    default:
        return 100
    }
}