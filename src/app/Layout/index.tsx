import styled from "styled-components";
import {Header} from "widgets/Header";
import {Footer} from "widgets/Footer";
import {ConfigProvider} from "antd";
import AppAuthRouter from "app/AppAuthRouter";

const Layout = () => {
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#D20A11',
                colorBorder: '#163E6C',
                colorBgContainer: 'inherit',
                colorText: '#163E6C'
            }
        }}>
            <LayoutStyled>
                <Header/>
                <ContentWrapper>
                    <AppAuthRouter/>
                </ContentWrapper>
                <Footer/>
            </LayoutStyled>
        </ConfigProvider>
    )
}

export default Layout;

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ContentWrapper = styled.div`
  margin-top: 90px;
  padding: 20px;
  width: 100%;
  height: 100%;
`