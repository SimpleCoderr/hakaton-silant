import { useMutation } from '@tanstack/react-query';
import {
  IComplaint,
  IComplaintsData,
  IQueryData,
  TIRole,
} from 'shared/interfaces';
import { $api } from 'shared/api';
import { TTableState, useTableState } from 'shared/states/useTableState';
import { useEffect, useMemo, useState } from 'react';
import Table from 'shared/components/table';
import { ColumnsType } from 'antd/es/table';
import { EComplaintProperties } from 'shared/enums';
import { useNavigate } from 'react-router-dom';
import { checkRoleAccess } from 'shared/helpers/checRoleAccess';
import { Button } from 'antd';

export const ComplaintsTable = () => {
  const navigate = useNavigate();
  const { page, sorting, filters, totalElements } = useTableState(
    (state: TTableState) => state,
  );
  const setTotalElements = useTableState(
    (state: TTableState) => state.setTotalElements,
  );
  const [complaintsData, setComplaintsData] = useState<IComplaint[]>([]);
  const [fields, setFields] = useState<(keyof typeof EComplaintProperties)[]>(
    [],
  );
  const setSorting = useTableState(state => state.setSorting);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ sorting, filters, page }: any) =>
      $api.post<IQueryData<IComplaintsData>>('/complaints', {
        sorting,
        filters,
        page,
      }),
    onSuccess: res => {
      const data = res.data.resultData.entities;
      setComplaintsData(data);
      setFields(res.data.resultData.fields.filter(field => field !== 'id'));
      setTotalElements(res.data.resultData.totalElements);
    },
    onError: err => {
      setComplaintsData([]);
    },
  });

  const columns: ColumnsType<typeof complaintsData> = useMemo(() => {
    return fields.map(field => ({
      title: EComplaintProperties[field],
      dataIndex: field,
      key: field,
      width: 100,
      fixed: field === 'carId' ? 'left' : undefined,
      sortDirections: ['ascend', 'descend'],
      sorter: { multiple: 1 },
    }));
  }, [fields]);

  const onChangeTable = (pagination: any, filters: any, sorter: any) => {
    if (Array.isArray(sorter)) {
      setSorting(
        sorter.reduce((acc: any, curr: any) => {
          acc[curr.field] = curr.order.includes('asc') ? 'asc' : 'desc';
          console.log(acc);
          return acc;
        }, {}),
      );
    } else {
      if (sorter.column === undefined) {
        setSorting({});
        return;
      }
      setSorting({
        [sorter.field]: sorter.order.includes('asc') ? 'asc' : 'desc',
      });
    }
  };

  const handleComplaintClick = ({ id: complaintsId }: any) => {
    return {
      onClick: () => {
        navigate(`/complaints/${complaintsId}`);
      },
    };
  };

  const handleAddComplaint = () => {
    navigate('/complaints/add');
  };

  useEffect(() => {
    mutate({ sorting, filters, page });
  }, [sorting, filters, page]);

  return (
    <div>
      <Table
        rowClick={handleComplaintClick}
        totalElements={totalElements}
        loading={isPending}
        columns={columns}
        data={complaintsData}
        onChange={onChangeTable}
      />
      {checkRoleAccess(
        localStorage.getItem('role') as TIRole,
        'addComplaint',
      ) && (
        <Button size={'large'} onClick={handleAddComplaint}>
          Добавить рекламацию
        </Button>
      )}
    </div>
  );
};
