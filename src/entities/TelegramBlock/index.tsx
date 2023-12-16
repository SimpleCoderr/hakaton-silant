import {TelegramIcon} from "shared/assets/icons/telegramIcon";
import styled from "styled-components";

const TelegramBlock = () => {
    return (
        <TelegramWrapper>
            <TelegramLink href={'https://t.me/+78352201209'} target={'_blank'}>+7-8352-20-12-09</TelegramLink>
            <TelegramIcon/>
        </TelegramWrapper>
    )
}

const TelegramWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TelegramLink = styled.a`
  font-style: italic;
  font-weight: 700;
  color: #163E6C;
  font-size: 20px;
  
  &:hover {
    color: #293F6C;
  }
`

export default TelegramBlock;