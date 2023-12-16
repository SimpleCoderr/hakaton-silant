import styled from "styled-components";
import {Button} from "antd";
import TelegramBlock from "entities/TelegramBlock";
import {Link, useNavigate} from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }
    return (
        <HeaderWrapper>
            <Link to='/'><img width={60} height={60} src={require('../../../shared/assets/png/logoAccent.png')}
                alt='logo'/>
            </Link>
            <TitleWrapper>
                <Title>Электронная сервисная книжка "Мой Силант"</Title>
                <TelegramBlock/>
            </TitleWrapper>
            <Button onClick={handleClick}>Авторизация</Button>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
  height: 90px;
  position: fixed;
  margin: 0 auto;
  max-width: 1440px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #EBE6D6;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`