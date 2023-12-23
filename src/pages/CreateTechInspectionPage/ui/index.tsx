import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';
import CreateInspectionForm from 'pages/CreateTechInspectionPage/ui/CreateInspectionForm';

export const CreateTechInspectionPage = () => {
  return (
    <div>
      <BreadcrumbToMain currentPageName={'Добавление тех. обслуживания'} />
      <Title name={'Введите данные тех. обслуживания'} />
      <CreateInspectionForm />
    </div>
  );
};
