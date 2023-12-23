import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IBreadcrumbToMain {
  currentPageName: string;
}

const BreadcrumbToMain = ({ currentPageName }: IBreadcrumbToMain) => {
  const items = [
    {
      title: <Link to={'/'}>Главная</Link>,
    },
    {
      title: currentPageName,
    },
  ];
  return (
    <BreadcrumbWrapper>
      <Breadcrumb items={items} />
    </BreadcrumbWrapper>
  );
};

export default BreadcrumbToMain;

const BreadcrumbWrapper = styled.div`
  margin-bottom: 20px;
`;
