import { Tabs, TabsProps } from 'antd';
import { CarsTable } from 'widgets/CarsTable';
import { useTableState } from 'shared/states/useTableState';
import { TechInspectionTable } from 'widgets/techInspectionTable';
import { useState } from 'react';
import { ComplaintsTable } from 'widgets/complaintsTable';
import FiltersBlock from 'widgets/FIltersBlock';
import styled, { css } from 'styled-components';
import { useResize } from 'shared/hooks/useResize';

type TTabsKey = 'cars' | 'techInspection' | 'complaints';
export const PageAuth = () => {
  const reset = useTableState(state => state.reset);
  const { isScreen576 } = useResize();
  const [tabsKey, setTabsKey] = useState<TTabsKey>('cars');
  const onChange = (key: TTabsKey) => {
    reset();
    setTabsKey(key);
  };
  const items: TabsProps['items'] = [
    {
      key: 'cars',
      label: 'Машины',
    },
    {
      key: 'techInspection',
      label: 'Тех. Обслуживание',
    },
    {
      key: 'complaints',
      label: 'Рекламации',
    },
  ];
  return (
    <>
      <Title $isScreen576={isScreen576}>
        Информация о комплектации и технических характеристиках Вашей техники
      </Title>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <FiltersBlock tableType={tabsKey} />
      {tabsKey === 'cars' ? (
        <CarsTable />
      ) : tabsKey === 'techInspection' ? (
        <TechInspectionTable />
      ) : (
        <ComplaintsTable />
      )}
    </>
  );
};

export default PageAuth;

const Title = styled.div<{ $isScreen576: boolean }>`
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      font-size: 24px;
      margin-bottom: 30px;
    `}
`;
