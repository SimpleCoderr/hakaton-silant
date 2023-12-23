import { IDirectory } from 'shared/interfaces';
import styled from 'styled-components';
import { COLOR_TEXT } from 'shared/const';

const Directory = ({ name, description }: IDirectory) => {
  return (
    <DirectoryWrapper>
      <RowWrapper>
        <Title>Название:</Title>
        <Property>{name}</Property>
      </RowWrapper>
      <RowWrapper>
        <Title>Описание:</Title>
        <Property>{description ? description : '-'}</Property>
      </RowWrapper>
    </DirectoryWrapper>
  );
};

export default Directory;

const DirectoryWrapper = styled.div`
  border: solid 2px ${COLOR_TEXT};
  border-radius: 5px;
  padding: 5px;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  font-weight: bold;
  min-width: 100px;
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const Property = styled.div`
  min-width: 200px;
  width: 50%;
`;
