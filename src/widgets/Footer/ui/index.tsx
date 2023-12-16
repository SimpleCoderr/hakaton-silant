import styled from "styled-components";
import TelegramBlock from "entities/TelegramBlock";

export const Footer = () => {
    return (
        <FooterWrapper>
            <TelegramBlock/>
            <Title>Мой силант {(new Date()).getFullYear()}</Title>
        </FooterWrapper>

    )
}

const FooterWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EBE6D6;
  padding: 20px 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`
