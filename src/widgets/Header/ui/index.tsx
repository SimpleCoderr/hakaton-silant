import styled, { css } from 'styled-components';
import { Button } from 'antd';
import TelegramBlock from 'entities/TelegramBlock';
import { Link, useNavigate } from 'react-router-dom';
import { IToken } from 'shared/interfaces';
import { jwtDecode } from 'jwt-decode';
import { UserDropdown } from 'features/userDropdown';
import { useResize } from 'shared/hooks/useResize';

export const Header = () => {
  const navigate = useNavigate();
  const { isScreen992, isScreen576 } = useResize();
  let tokenObj: IToken;
  const imgSize = isScreen576 ? 60 : 40;
  if (localStorage.getItem('accessToken')) {
    tokenObj = jwtDecode(localStorage.getItem('accessToken'));
  }

  const handleClick = () => {
    navigate('/login');
  };
  return (
    <HeaderWrapper $isScreen576={isScreen576}>
      <Link to="/">
        <img
          width={imgSize}
          height={imgSize}
          src={require('../../../shared/assets/png/logoAccent.png')}
          alt="logo"
        />
      </Link>
      {isScreen576 && (
        <TitleWrapper>
          <Title $isScreen992={isScreen992}>
            Электронная сервисная книжка "Мой Силант"
          </Title>
          <TelegramBlock />
        </TitleWrapper>
      )}
      {tokenObj ? (
        <UserDropdown username={tokenObj.sub} />
      ) : (
        <Button onClick={handleClick}>Авторизация</Button>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ $isScreen576: boolean }>`
  height: 90px;
  position: fixed;
  margin: 0 auto;
  max-width: 1440px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #ebe6d6;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  ${({ $isScreen576 }) =>
    !$isScreen576 &&
    css`
      height: 60px;
    `}
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div<{ $isScreen992: boolean }>`
  font-size: 24px;
  font-weight: 700;

  ${({ $isScreen992 }) =>
    !$isScreen992 &&
    css`
      font-size: 16px;
    `}
`;
