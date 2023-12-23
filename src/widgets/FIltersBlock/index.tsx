import styled, { css } from 'styled-components';
import { Form, Input } from 'antd';
import {
  EComplaintProperties,
  EMachineProperties,
  ETechInspectionProperties,
} from 'shared/enums';
import { useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { COLOR_TEXT } from 'shared/const';
import { useTableState } from 'shared/states/useTableState';
import { useResize } from 'shared/hooks/useResize';

const forCarsTable: (keyof typeof EMachineProperties)[] = [
  'techModel',
  'engineModel',
  'transModel',
  'controlBridgeModel',
  'driveAxleModel',
];

const forTechInspectionTable: (keyof typeof ETechInspectionProperties)[] = [
  'type',
  'carId',
  'company',
];

const forComplaintsTable: (keyof typeof EComplaintProperties)[] = [
  'rejectNode',
  'recoveryMethod',
  'company',
];

interface IFiltersBlock {
  tableType: 'cars' | 'techInspection' | 'complaints';
}

const FiltersBlock = ({ tableType }: IFiltersBlock) => {
  const { isScreen576 } = useResize();

  const setFilters = useTableState(state => state.setFilters);
  const [form] = Form.useForm();
  const formItemArray =
    tableType === 'cars'
      ? forCarsTable
      : tableType === 'techInspection'
        ? forTechInspectionTable
        : forComplaintsTable;
  const NeedEnum =
    tableType === 'cars'
      ? EMachineProperties
      : tableType === 'techInspection'
        ? ETechInspectionProperties
        : EComplaintProperties;

  const handleChangeForm = (currentChanged: any, allChanged: any[]) => {
    setFilters(
      allChanged.reduce((acc, curr) => {
        if (curr.value) {
          return { ...acc, [curr.name[0]]: curr.value };
        }
        return acc;
      }, {}),
    );
  };

  const handleResetFilters = (e: React.MouseEvent<HTMLElement>) => {
    setFilters({});
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [tableType]);
  return (
    <FiltersBlockStyled>
      <Form form={form} onFieldsChange={handleChangeForm} layout="vertical">
        <FormContentWrapper $isScreen576={isScreen576}>
          {formItemArray.map(key => (
            <Form.Item
              key={key}
              name={key}
              label={NeedEnum[key as keyof typeof NeedEnum]}
            >
              <Input />
            </Form.Item>
          ))}
        </FormContentWrapper>
      </Form>
      <ResetFilters onClick={handleResetFilters}>
        <CloseCircleOutlined />
        <span>Сбросить фильтры</span>
      </ResetFilters>
    </FiltersBlockStyled>
  );
};

export default FiltersBlock;

const FiltersBlockStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const FormContentWrapper = styled.div<{ $isScreen576: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      justify-content: center;
      gap: 0;
    `}
`;

const ResetFilters = styled.div`
  display: flex;
  gap: 8px;
  font-size: 16px;
  align-items: center;
  color: ${COLOR_TEXT};
  cursor: pointer;
  padding: 0 16px;
`;
