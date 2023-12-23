import CreateCarForm from 'pages/CreateCarPage/ui/CreateCarForm';
import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';

export const CreateCarPage = () => {
  return (
    <div>
      <BreadcrumbToMain currentPageName={'Создание машины'} />
      <Title name={'Введите данные машины'} />
      <CreateCarForm />
    </div>
  );
};
