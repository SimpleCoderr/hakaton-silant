import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';

export const RegisterPage = () => {
  return (
    <div>
      <BreadcrumbToMain currentPageName={'Регистрация пользователя'} />
      <Title name={'Зарегистрируйте нового пользователя'} />
      {/*<RegisterForm />*/}
    </div>
  );
};
