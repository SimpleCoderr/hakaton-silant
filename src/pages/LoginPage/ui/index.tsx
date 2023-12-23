import styled, { css } from 'styled-components';
import { Button, Col, Form, Input, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ILoginData, IQueryData } from 'shared/interfaces';
import { API_URL } from 'shared/api';
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'shared/states/useAppState';
import { useResize } from 'shared/hooks/useResize';

type TFormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isScreen576 } = useResize();
  const [form] = Form.useForm();
  const setIsLoading = useAppState(state => state.setIsLoading);

  const rules = [{ required: true, message: 'заполните поле!' }];

  const { mutate } = useMutation({
    mutationFn: ({ password, email }: TFormData) => {
      setIsLoading(true);
      return axios.post<IQueryData<ILoginData>>(
        `${API_URL}/auth/authenticate`,
        {
          email,
          password,
        },
      );
    },
    onSuccess: res => {
      localStorage.setItem('accessToken', res.data.resultData.accessToken);
      localStorage.setItem('refreshToken', res.data.resultData.refreshToken);

      navigate('/');

      notification.success({
        message: 'Уведомление',
        description: 'Вы успешно вошли в систему!',
      });
      setIsLoading(false);
    },
    onError: error => {
      notification.error({
        message: 'Ошибка!',
        description: 'Введен неверный логин или пароль',
      });
      setIsLoading(false);
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        mutate({
          ...values,
        });
      })
      .catch(() => {
        notification.warning({
          message: 'Предупреждение!',
          description: 'Заполните все обязательные поля!',
        });
      });
  };

  return (
    <>
      <PageWrapper>
        <PageContentWrapper $isScreen576={isScreen576}>
          <PageTitle>Вход</PageTitle>
          <FormStyled form={form} name="login" layout={'vertical'}>
            <Col>
              <Form.Item
                name="email"
                label="Имя пользователя"
                required
                rules={rules}
              >
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Пароль" required rules={rules}>
                <Input type="password" />
              </Form.Item>
              <FormItemStyled name="password">
                <Button onClick={handleSubmit}>Войти</Button>
              </FormItemStyled>
            </Col>
          </FormStyled>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PageContentWrapper = styled.div<{ $isScreen576: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #163e6c;
  padding: 5% 15%;
  width: max-content;
  margin: 0 auto;
  border-radius: 20px;
  max-width: 100%;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      padding: 5% 10%;
    `}
`;

const FormStyled = styled(Form)`
  max-width: 500px;
  min-width: 300px;
  width: 100%;
`;

const PageTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const FormItemStyled = styled(Form.Item)`
  display: flex;
  justify-content: center;
`;
