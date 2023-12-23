import InfoItem from 'shared/components/InfoItem';
import styled from 'styled-components';
import { IInfoItem } from 'shared/interfaces';

export const InfoBlock = ({ infoItems }: { infoItems: IInfoItem[] }) => {
  return (
    <InfoItemsWrapper>
      {infoItems &&
        infoItems.map(item => <InfoItem key={item.title} {...item} />)}
    </InfoItemsWrapper>
  );
};

const InfoItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 20px;
  margin-bottom: 40px;
`;
