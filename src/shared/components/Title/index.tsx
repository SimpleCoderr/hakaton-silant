import { Typography } from 'antd';
import styled, { css } from 'styled-components';
import { useResize } from 'shared/hooks/useResize';

interface ITitle {
  name: string;
}

const Title = ({ name }: ITitle) => {
  const { isScreen576 } = useResize();
  return (
    <TitleWrapper $isScreen576={isScreen576}>
      <TitleStyled $isScreen576={isScreen576}>{name}</TitleStyled>
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.div<{ $isScreen576: boolean }>`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      font-size: 24px !important;
      margin-bottom: 10px;
    `}
`;

const TitleStyled = styled(Typography.Title)<{ $isScreen576: boolean }>`
  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      font-size: 24px !important;
    `}
`;
