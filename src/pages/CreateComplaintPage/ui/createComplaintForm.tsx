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
import { EComplaintProperties } from 'shared/enums';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ICompany,
  IComplaint,
  IComplaintData,
  IQueryData,
  ISerialsNumberData,
  IToken,
} from 'shared/interfaces';
import { $api, API_URL } from 'shared/api';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'shared/states/useAppState';
import styled from 'styled-components';
import { useInput } from 'shared/hooks/useInput';
import { jwtDecode } from 'jwt-decode';

enum EInspectionPropertiesSelect {
  REJECT_NODE = 'rejectNode',
  RECOVERY_METHOD = 'recoveryMethod',
}

const requiredFields: string[] = [
  'carId',
  'rejectDate',
  'operating',
  'rejectNode',
  'rejectDescription',
  'recoveryMethod',
  'sparePartsUsed',
  'recoveryDate',
  'equipmentDowntime',
  'company',
];

const datePickerFields: (keyof typeof EComplaintProperties)[] = [
  'rejectDate',
  'recoveryDate',
];

const CreateComplaintForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const jwtObj: IToken = jwtDecode(localStorage.getItem('accessToken'));
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

  for (const key in EComplaintProperties) {
    if (key && key !== 'id') {
      if (
        ![
          'carId',
          'company',
          'rejectDate',
          'recoveryDate',
          'rejectNode',
          'recoveryMethod',
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

    if (property === 'equipmentDowntime' || property === 'operating') {
      rules.push({
        pattern: /^\d+$/,
        message: 'Введите численное значение!',
      });
    }
    return requiredFields.includes(property) ? rules : [];
  };

  const { data: selectsData } = useQuery({
    queryKey: ['directories'],
    queryFn: () => {
      return $api.post<IQueryData<any>>(`${API_URL}/directories/values`, {
        types: ['RECOVERY_METHOD', 'REJECT_NODE'],
      });
    },
  });

  const { data: selectClientData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => {
      return $api.get<IQueryData<ICompany[]>>(`${API_URL}/companies`);
    },
    enabled: !jwtObj?.company,
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
    mutationFn: (complaint: Omit<IComplaint, 'id'>) => {
      setIsLoading(true);
      return $api.post<IQueryData<IComplaintData>>('/complaints/save', {
        ...complaint,
      });
    },
    onSuccess: res => {
      notification['success']({
        message: 'Уведомление',
        description: 'Новая заявка на рекламацию создана!',
      });
      navigate('/');
    },
    onError: err => {
      notification['error']({
        message: 'Уведомление',
        description: 'Новая заявка на рекламацию не создана, произошла ошибка!',
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
          rejectDate: values.rejectDate.format('YYYY-MM-DD'),
          recoveryDate: values.recoveryDate.format('YYYY-MM-DD'),
        });
      })
      .catch(info => {
        notification['warning']({
          message: 'Предупреждение',
          description: 'Заполните все обязательные поля',
        });
      });
  };

  useEffect(() => {
    if (jwtObj?.company) {
      form.setFieldsValue({
        company: jwtObj?.company,
      });
    }
  }, [jwtObj?.company]);

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
          label={EComplaintProperties['carId']}
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
              EComplaintProperties[
                property as keyof typeof EComplaintProperties
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
              title: keyof typeof EComplaintProperties;
              values: string[];
            }) => (
              <Form.Item
                key={title}
                name={title}
                label={EComplaintProperties[title]}
                rules={getRules(title)}
              >
                <SelectStyled
                  options={values.map(value => ({ label: value, value }))}
                />
              </Form.Item>
            ),
          )}
        {jwtObj?.company ? (
          <Form.Item
            key={'company'}
            name={'company'}
            label={
              EComplaintProperties[
                'company' as keyof typeof EComplaintProperties
              ]
            }
          >
            <Input disabled />
          </Form.Item>
        ) : (
          selectClientData &&
          ['company'].map(property => (
            <Form.Item
              key={property}
              name={property}
              label={
                EComplaintProperties[
                  property as keyof typeof EComplaintProperties
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
          ))
        )}
        {datePickerFields.map(property => (
          <Form.Item
            name={property}
            label={EComplaintProperties[property]}
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

export default CreateComplaintForm;

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
