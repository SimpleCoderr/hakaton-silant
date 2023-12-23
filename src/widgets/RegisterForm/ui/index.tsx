import {Form} from 'antd';
import {useForm} from 'antd/es/form/Form';

// const roles: ['MANAGER', 'CLIENT'];

const RegisterForm = () => {
  const [form] = useForm();
  return <Form layout={'vertical'} form={form}></Form>;
};
