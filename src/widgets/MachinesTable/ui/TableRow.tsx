import styled, {css} from "styled-components";

type TTableRow = {
    title: string;
    value: string;
    isOdd: boolean
}
export enum EMachineProperties {
    serialNumber = 'Зав. номер машины',
    techModel = 'Модель техники',
    engineModel = 'Модель двигателя',
    engineSerialNumber = 'Зав. номер двигателя',
    transModel = 'Модель трансмиссии',
    transSerialNumber = 'Зав. номер трансмиссии',
    driveAxleModel = 'Модель ведущего моста',
    driveAxleSerialNumber = 'Зав. номер ведущего моста',
    controlBridgeModel = 'Модель управляющего моста',
    controlBridgeSerialNumber = 'Зав. номер управляющего моста'
}
const TableRow = ({title, value, isOdd}: TTableRow) => {
    return (
        <RowWrapper $isOdd={isOdd}>
            <TitleRow>{EMachineProperties[title as keyof typeof EMachineProperties]}:</TitleRow>
            <ValueRow>{value}</ValueRow>
        </RowWrapper>
    )
}

export default TableRow;

const RowWrapper = styled.div<{$isOdd: boolean}>`
  width: 100%;
  display: flex;
  padding: 10px 0;
  
  ${(props) => props.$isOdd && 
    css`
      background-color: #EBE6D6;
    `
}
  &:hover {
    background-color: #dedee0;
  }
`

const TitleRow = styled.div`
  flex: 1 1 70%;
`

const ValueRow = styled.div`
  flex: 1 1 30%;
`