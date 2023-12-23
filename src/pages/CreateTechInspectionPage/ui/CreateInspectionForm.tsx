import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { ETechInspectionProperties } from 'shared/enums';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ICompany,
  IQueryData,
  ISerialsNumberData,
  ITechInspection,
  ITechInspectionData,
} from 'shared/interfaces';
import { $api, API_URL } from 'shared/api';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'shared/states/useAppState';
import styled from 'styled-components';
import { useInput } from 'shared/hooks/useInput';

enum EInspectionPropertiesSelect {
  TECH_INSPECTION_TYPE = 'type',
}

const requiredFields: string[] = [
  'carId',
  'type',
  'maintenanceDate',
  'operating',
  'orderNumber',
  'orderNumberDate',
  'company',
];

const datePickerFields: (keyof typeof ETechInspectionProperties)[] = [
  'maintenanceDate',
  'orderNumberDate',
];

const CreateInspectionForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setIsLoading = useAppState(state => state.setIsLoading);
  const inspectionPropertyInputs: string[] = [];
  const inputProps = useInput();

  const { data: possibleSerialNumData } = useQuery({
    queryKey: [inputProps.value],
    queryFn: () => {
      return $api.get<IQueryData<ISerialsNumberData>>(
        `/cars/list-by-part/${inputProps.value}`,
      );
    },
    enabled: !!inputProps.value,
    retry: false,
  });

  for (const key in ETechInspectionProperties) {
    if (key && key !== 'id') {
      if (
        ![
          'carId',
          'type',
          'company',
          'maintenanceDate',
          'orderNumberDate',
        ].some(item => key.includes(item))
      ) {
        inspectionPropertyInputs.push(key);
      }
    }
  }

  const getRules = (property: string) => {
    const rules: any[] = [
      {
        required: true,
        message: 'Пожалуйста, заполните поле.',
      },
    ];

    if (property === 'operating') {
      rules.push({
        pattern: /^\d+$/,
        message: 'Введите число!',
      });
    }
    return requiredFields.includes(property) ? rules : [];
  };

  const { data: selectsData } = useQuery({
    queryKey: ['directories'],
    queryFn: () => {
      return $api.post<IQueryData<any>>(`${API_URL}/directories/values`, {
        types: ['TECH_INSPECTION_TYPE'],
      });
    },
  });

  const { data: selectClientData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => {
      return $api.get<IQueryData<ICompany[]>>(`${API_URL}/companies`);
    },
  });

  const selectsPropertyArray: any = useMemo(() => {
    const array: any[] = [];
    if (selectsData?.data?.resultData?.values) {
      for (const selectProperty in selectsData.data.resultData.values) {
        if (
          Object.prototype.hasOwnProperty.call(
            selectsData.data.resultData.values,
            selectProperty,
          )
        ) {
          array.push({
            title:
              EInspectionPropertiesSelect[
                selectProperty as keyof typeof EInspectionPropertiesSelect
              ],
            values: selectsData.data.resultData.values?.[selectProperty],
          });
        }
      }
    }

    return array;
  }, [selectsData]);

  const { mutate, isPending } = useMutation({
    mutationFn: (inspection: Omit<ITechInspection, 'id'>) => {
      setIsLoading(true);
      return $api.post<IQueryData<ITechInspectionData>>('/inspections/add', {
        ...inspection,
      });
    },
    onSuccess: res => {
      notification['success']({
        message: 'Уведомление',
        description: 'Новая заявка на ТО создана!',
      });
      navigate('/');
    },
    onError: err => {
      notification['error']({
        message: 'Уведомление',
        description: 'Новая заявка на ТО не создана, произошла ошибка!',
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSaveCar = () => {
    form
      .validateFields()
      .then(values => {
        mutate({
          ...values,
        });
      })
      .catch(info => {
        notification['warning']({
          message: 'Предупреждение',
          description: 'Заполните все обязательные поля',
        });
      });
  };

  return (
    <>
      <FormStyled
        layout="vertical"
        form={form}
        onFieldsChange={(e, all) => console.log(e, all)}
      >
        <Form.Item
          key={'carId'}
          name={'carId'}
          label={ETechInspectionProperties['carId']}
          rules={getRules('carId')}
        >
          <AutoComplete
            style={{ width: 200 }}
            options={possibleSerialNumData?.data?.resultData?.numbers?.map(
              number => ({
                value: number,
                label: number,
              }),
            )}
            {...inputProps}
          />
        </Form.Item>
        {inspectionPropertyInputs.map(property => (
          <Form.Item
            key={property}
            name={property}
            label={
              ETechInspectionProperties[
                property as keyof typeof ETechInspectionProperties
              ]
            }
            rules={getRules(property)}
          >
            <InputStyled />
          </Form.Item>
        ))}
        {selectsPropertyArray &&
          selectsPropertyArray.map(
            ({
              title,
              values,
            }: {
              title: keyof typeof ETechInspectionProperties;
              values: string[];
            }) => (
              <Form.Item
                key={title}
                name={title}
                label={ETechInspectionProperties[title]}
                rules={getRules(title)}
              >
                <SelectStyled
                  options={values.map(value => ({ label: value, value }))}
                />
              </Form.Item>
            ),
          )}
        {selectClientData &&
          ['company'].map(property => (
            <Form.Item
              key={property}
              name={property}
              label={
                ETechInspectionProperties[
                  property as keyof typeof ETechInspectionProperties
                ]
              }
              rules={getRules(property)}
            >
              <SelectStyled
                options={selectClientData?.data.resultData.map(({ name }) => ({
                  label: name,
                  value: name,
                }))}
              />
            </Form.Item>
          ))}
        {datePickerFields.map(property => (
          <Form.Item
            name={property}
            label={ETechInspectionProperties[property]}
            rules={getRules(property)}
            key={property}
          >
            <DatePickerStyled />
          </Form.Item>
        ))}

        <ColStyled span={24}>
          <Form.Item>
            <ButtonStyled onClick={handleSaveCar}>
              Добавить заявку на ТО
            </ButtonStyled>
          </Form.Item>
        </ColStyled>
      </FormStyled>
    </>
  );
};

export default CreateInspectionForm;

const FormStyled = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const InputStyled = styled(Input)`
  max-width: 300px;
  min-width: 200px;
`;

const SelectStyled = styled(Select)`
  max-width: 350px !important;
  min-width: 300px;
`;

const DatePickerStyled = styled(DatePicker)`
  max-width: 300px;
  min-width: 200px;
`;

const ButtonStyled = styled(Button)`
  margin: 0 auto;
`;

const ColStyled = styled(Col)`
  display: flex;
  justify-content: center;
`;
