import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { EMachineProperties } from 'shared/enums';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ICompany,
  IMachin,
  IMachineForAnonimous,
  IMachinesData,
  IQueryData,
} from 'shared/interfaces';
import { $api, API_URL } from 'shared/api';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'shared/states/useAppState';
import styled from 'styled-components';

enum ECarPropertiesSelect {
  DRIVE_AXEL_MODEL = 'driveAxleModel',
  TECH_MODEL = 'techModel',
  ENGINE_MODEL = 'engineModel',
  TRANS_MODEL = 'transModel',
  CONTROL_BRIDGE_MODEL = 'controlBridgeModel',
}

const requiredFields: string[] = [
  'serialNumber',
  'techModel',
  'engineModel',
  'engineSerialNumber',
  'transModel',
  'transSerialNumber',
  'driveAxleModel',
  'driveAxleSerialNumber',
  'controlBridgeModel',
  'controlBridgeSerialNumber',
  'factoryDateShipment',
];

const CreateCarForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setIsLoading = useAppState(state => state.setIsLoading);
  const carPropertyInputs: string[] = [];

  for (const key in EMachineProperties) {
    if (key && !key.includes('Date')) {
      if (
        !['Model', 'Date', 'client', 'company'].some(item => key.includes(item))
      ) {
        carPropertyInputs.push(key);
      }
    }
  }

  const getRules = (property: string) => {
    const rules = [
      {
        required: true,
        message: 'Пожалуйста, заполните поле.',
      },
    ];
    return requiredFields.includes(property) ? rules : [];
  };

  const { data: selectsData } = useQuery({
    queryKey: ['directories'],
    queryFn: () => {
      return $api.post<IQueryData<any>>(`${API_URL}/directories/values`, {
        types: [
          'ENGINE_MODEL',
          'TRANS_MODEL',
          'CONTROL_BRIDGE_MODEL',
          'DRIVE_AXEL_MODEL',
          'TECH_MODEL',
        ],
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
              ECarPropertiesSelect[
                selectProperty as keyof typeof ECarPropertiesSelect
              ],
            values:
              selectsData.data.resultData.values?.[
                selectProperty as keyof IMachineForAnonimous
              ],
          });
        }
      }
    }

    return array;
  }, [selectsData]);

  const { mutate, isPending } = useMutation({
    mutationFn: (car: IMachin) => {
      setIsLoading(true);
      return $api.post<IQueryData<IMachinesData>>('/cars/save', {
        ...car,
      });
    },
    onSuccess: res => {
      notification['success']({
        message: 'Уведомление',
        description: 'Новая машина создана!',
      });
      navigate('/');
    },
    onError: err => {
      notification['error']({
        message: 'Уведомление',
        description: 'Новая машина не создана, произошла ошибка!',
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
          factoryDateShipment: values.factoryDateShipment.format('YYYY-MM-DD'),
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
        {carPropertyInputs.map(property => (
          <Form.Item
            key={property}
            name={property}
            label={
              EMachineProperties[property as keyof typeof EMachineProperties]
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
              title: keyof typeof EMachineProperties;
              values: string[];
            }) => (
              <Form.Item
                key={title}
                name={title}
                label={EMachineProperties[title]}
                rules={getRules(title)}
              >
                <SelectStyled
                  options={values.map(value => ({ label: value, value }))}
                />
              </Form.Item>
            ),
          )}
        {selectClientData &&
          ['client', 'company'].map(property => (
            <Form.Item
              key={property}
              name={property}
              label={
                EMachineProperties[property as keyof typeof EMachineProperties]
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
        <Form.Item
          name="factoryDateShipment"
          label={EMachineProperties['factoryDateShipment']}
          rules={getRules('factoryDateShipment')}
        >
          <DatePickerStyled />
        </Form.Item>
        <ColStyled span={24}>
          <Form.Item>
            <ButtonStyled onClick={handleSaveCar}>Сохранить</ButtonStyled>
          </Form.Item>
        </ColStyled>
      </FormStyled>
    </>
  );
};

export default CreateCarForm;

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
