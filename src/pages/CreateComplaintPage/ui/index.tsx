import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';
import CreateComplaintForm from 'pages/CreateComplaintPage/ui/createComplaintForm';

export const CreateComplaintPage = () => {
  return (
    <div>
      <BreadcrumbToMain currentPageName={'Добавление рекламации'} />
      <Title name={'Введите данные рекламации'} />
      <CreateComplaintForm />
    </div>
  );
};
