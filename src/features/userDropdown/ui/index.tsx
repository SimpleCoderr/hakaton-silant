import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
import { useAppState } from 'shared/states/useAppState';

interface IUserDropdown {
  username: string;
}

export const UserDropdown = ({ username }: IUserDropdown) => {
  const setIsLoading = useAppState(state => state.setIsLoading);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div>Выйти</div>,
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        try {
          setIsLoading(true);
          axios
            .post(
              `http://62.76.228.98:16000/auth/v1/logout`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken',
                  )}`,
                },
              },
            )
            .then(() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            })
            .finally(() => setIsLoading(false));
        } catch (e) {
          console.log(e);
        }
      },
    },
  ];
  return (
    <DropdownStyled trigger={['hover']} menu={{ items }}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          {username}
          <DownOutlined />
        </Space>
      </a>
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  cursor: pointer;
`;
