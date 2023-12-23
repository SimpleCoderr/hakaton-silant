import styled from 'styled-components';

interface IInfoItem {
  title: string;
  name: string;
}

const InfoItem = ({ title, name }: IInfoItem) => {
  return (
    <InfoItemWrapper>
      <InfoItemTitle>{title}:</InfoItemTitle>
      <InfoItemName>{name}</InfoItemName>
    </InfoItemWrapper>
  );
};

export default InfoItem;

const InfoItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  min-width: 300px;
  flex: 1 1 calc(33% - 40px);
`;

const InfoItemTitle = styled.div`
  min-width: 150px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
`;

const InfoItemName = styled.div`
  min-width: 150px;
`;
