import { ConfigProvider, Table } from 'antd';
import {
  DEFAULT_LIMIT,
  TTableState,
  useTableState,
} from 'shared/states/useTableState';
import styled from 'styled-components';
import { COLOR_PRIMARY } from 'shared/const';

interface IMyTable {
  columns: any;
  data: any[];
  loading: boolean;
  totalElements: number;
  onChange: (_pagination: any, _filters: any, sorter: any) => void;
  scroll?: {
    x: string;
  };
  rowClick?: <T>(record: T) => any;
}

const MyTable = ({
  columns,
  data,
  loading,
  totalElements,
  onChange,
  scroll,
  rowClick,
}: IMyTable) => {
  const setPage = useTableState((state: TTableState) => state.setPage);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            fontSize: 12,
            rowHoverBg: '#fafafa',
            headerBg: COLOR_PRIMARY,
            headerSortActiveBg: COLOR_PRIMARY,
            headerSortHoverBg: COLOR_PRIMARY,
            fixedHeaderSortActiveBg: COLOR_PRIMARY,
          },
        },
      }}
    >
      <TableWrapper>
        <TableStyled
          onRow={rowClick}
          bordered
          pagination={{
            position: ['topLeft'],
            total: totalElements,
            defaultPageSize: DEFAULT_LIMIT,
            hideOnSinglePage: true,
            onChange: pageNumber => setPage(pageNumber - 1),
          }}
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={scroll}
          onChange={onChange}
        />
      </TableWrapper>
    </ConfigProvider>
  );
};

export default MyTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  margin-bottom: 30px;
`;

const TableStyled = styled(Table)`
  & .ant-table-cell {
    background-color: #ffff;
    padding: 4px !important;
  }

  & .ant-table-content::-webkit-scrollbar {
    height: 8px !important;
    background-color: #f5f5f5;
    border-radius: 10px !important;
    cursor: pointer;
  }

  & .ant-table-content::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px !important;
    height: 8px !important;
  }

  & .ant-table-content::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
