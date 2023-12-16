import styled from "styled-components";
import {useInput} from "shared/hooks/useInput";
import {AutoComplete, Button} from "antd";
import {MachineTable} from "widgets/MachinesTable/ui";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {IQueryData, ISerialsNumberData} from "shared/interfaces";
import {API_URL} from "shared/api";


export const MainPage = () => {
    const inputProps = useInput();
    const [searchSerialNumber, setSearchSerialNumber] = useState('')

    const {data: possibleSerialNumData} = useQuery(
        {
            queryKey: [inputProps.value],
            queryFn: () => {
                return axios.get<IQueryData<ISerialsNumberData>>(`${API_URL}/cars/list-by-part-anonymize/${inputProps.value}`)
            },
            enabled: !!inputProps.value,
            retry: false,
        })

    const handleClick = () => {
        setSearchSerialNumber(inputProps.value)
    }
    return (
        <PageWrapper>
            <Title>Проверьте комплектацию и технические характеристики техники Силант</Title>
            <InputBlock>
                <InputTitle>Заводской номер:</InputTitle>
                <InputWrapper>
                    <AutoComplete
                        style={{width: 200}}
                        options={possibleSerialNumData?.data?.resultData?.numbers?.map(number => ({value: number, label: number}))}
                        {...inputProps}
                    />
                </InputWrapper>
                <Button onClick={handleClick}>Поиск</Button>
            </InputBlock>
            {/*<div>*/}
            {/*    {possibleSerialNumData?.data?.resultData?.numbers.map(number => number + " ,")}*/}
            {/*</div>*/}
            <MachineTable serialNumber={searchSerialNumber}/>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Title = styled.div`
  text-align: center;
  font-size: 30px;
`

const InputBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const InputTitle = styled.div`
  width: 100px;
  text-align: center;
`

const InputWrapper = styled.div`
  position: relative;
`