import styled, { css } from 'styled-components';
import TelegramBlock from 'entities/TelegramBlock';
import { useResize } from 'shared/hooks/useResize';

export const Footer = () => {
  const { isScreen576 } = useResize();

  return (
    <FooterWrapper $isScreen576={isScreen576}>
      <TelegramBlock />
      {!isScreen576 ? (
        <img
          width={120}
          height={50}
          src={require('shared/assets/png/logo.png')}
          alt="logo"
        />
      ) : (
        <Title>Мой силант {new Date().getFullYear()}</Title>
      )}
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div<{ $isScreen576: boolean }>`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ebe6d6;
  padding: 20px 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 30px;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      font-size: 16px !important;
      padding: 15px 20px;
    `}
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
