import { AutoComplete, Button } from 'antd';
import { useInput } from 'shared/hooks/useInput';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from 'shared/api';
import { IQueryData, ISerialsNumberData } from 'shared/interfaces';
import axios from 'axios';
import { MachineTable } from 'widgets/MachinesTable';
import styled, { css } from 'styled-components';
import { useResize } from 'shared/hooks/useResize';

export const PageNotAuth = () => {
  const inputProps = useInput();
  const { isScreen576 } = useResize();
  const [searchSerialNumber, setSearchSerialNumber] = useState('');

  const { data: possibleSerialNumData } = useQuery({
    queryKey: [inputProps.value],
    queryFn: () => {
      return axios.get<IQueryData<ISerialsNumberData>>(
        `${API_URL}/cars/list-by-part-anonymize/${inputProps.value}`,
      );
    },
    enabled: !!inputProps.value,
    retry: false,
  });

  const handleClick = () => {
    setSearchSerialNumber(inputProps.value);
  };
  return (
    <>
      <PageWrapper>
        <Title $isScreen576={isScreen576}>
          Проверьте комплектацию и технические характеристики техники Силант
        </Title>
        <InputBlock $isScreen576={isScreen576}>
          <InputTitle $isScreen576={isScreen576}>Заводской номер:</InputTitle>
          <InputWrapper>
            <AutoComplete
              style={{
                width: isScreen576 ? 200 : 300,
                height: isScreen576 ? 32 : 40,
                fontSize: 20,
              }}
              options={possibleSerialNumData?.data?.resultData?.numbers?.map(
                number => ({
                  value: number,
                  label: number,
                }),
              )}
              {...inputProps}
            />
          </InputWrapper>
          <Button size={isScreen576 ? 'middle' : 'large'} onClick={handleClick}>
            Поиск
          </Button>
        </InputBlock>
        <MachineTable serialNumber={searchSerialNumber} />
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div<{ $isScreen576: boolean }>`
  text-align: center;
  font-size: 30px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      font-size: 24px;
    `}
`;

const InputBlock = styled.div<{ $isScreen576: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      flex-direction: column;
      width: 300px;
      gap: 20px;
    `}
`;
const InputTitle = styled.div<{ $isScreen576: boolean }>`
  width: 100px;
  text-align: center;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      flex-direction: column;
      width: 100%;
      font-size: 20px;
    `}
`;

const InputWrapper = styled.div`
  position: relative;
`;
