import styled, { css } from 'styled-components';
import { EMachineProperties } from 'shared/enums';

type TTableRow = {
  title: string;
  value: string;
  isOdd: boolean;
  onClick: (directoryName: string) => void;
  isClickable: boolean;
};
const TableRow = ({
  title,
  value,
  isOdd,
  onClick: findDirectory,
  isClickable,
}: TTableRow) => {
  const handleClick = () => {
    findDirectory(value);
  };
  return (
    <RowWrapper
      $isClickable={isClickable}
      onClick={isClickable ? handleClick : undefined}
      $isOdd={isOdd}
    >
      <TitleRow>
        {EMachineProperties[title as keyof typeof EMachineProperties]}:
      </TitleRow>
      <ValueRow>{value}</ValueRow>
    </RowWrapper>
  );
};

export default TableRow;

const RowWrapper = styled.div<{ $isOdd: boolean; $isClickable: boolean }>`
  width: 100%;
  display: flex;
  padding: 10px 0;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};

  ${props =>
    props.$isOdd &&
    css`
      background-color: #ebe6d6;
    `}
  &:hover {
    background-color: #dedee0;
  }
`;

const TitleRow = styled.div`
  flex: 1 1 70%;
`;

const ValueRow = styled.div`
  flex: 1 1 30%;
`;
