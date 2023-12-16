import styled from "styled-components";
import {IMachineForAnonimous, IMachineForAnonimousData, IQueryData} from "shared/interfaces";
import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import TableRow from "widgets/MachinesTable/ui/TableRow";
import TableDataLoading from "widgets/MachinesTable/ui/TableDataLoading";
import {API_URL} from "shared/api";

type TMachineProperties = {
    title: string;
    value: string;
}

interface IMachineTable {
    serialNumber: string;
}

export const MachineTable = ({serialNumber}: IMachineTable) => {

    const {data: machineData, isLoading, isFetching, isError} = useQuery(
        {
            queryKey: [serialNumber],
            queryFn: () => {
                return axios.get<IQueryData<IMachineForAnonimousData>>(`${API_URL}/cars/serial-number-anonymize/${serialNumber}`)
            },
            enabled: !!serialNumber,
            retry: false,
        })

    const machinePropertiesArray: TMachineProperties[] = useMemo(() => {
        const array: TMachineProperties[] = []
        if (machineData?.data?.resultData?.entity) {
            for (const machineProperty in machineData.data.resultData.entity) {
                if (Object.prototype.hasOwnProperty.call(machineData.data.resultData.entity, machineProperty)) {
                    array.push({title: machineProperty, value: String(machineData.data.resultData.entity?.[machineProperty as keyof IMachineForAnonimous])})
                }
            }
        }

        return array;
    }, [machineData])


    if (!serialNumber) {
        return <DoSearch>Начните поиск машины по заводскому номеру</DoSearch>
    }

    if (isLoading || isFetching) {
        return <TableDataLoading/>
    }

    if (isError) {
        return <DoSearch>Машины с серийным номером {serialNumber} не найдено</DoSearch>
    }

    return (
        <TableWrapper>
            {machinePropertiesArray.map((property, index) =>
                <TableRow {...property} isOdd={!!((index + 1) % 2)} key={property.title}/>)}
        </TableWrapper>
    )
}

const TableWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: #EBE6D6 2px solid;
`

const DoSearch = styled.div`
  text-decoration: underline;
  font-size: 18px;
`