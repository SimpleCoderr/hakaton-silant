import { useMutation } from '@tanstack/react-query';
import { IMachin, IMachinesData, IQueryData, TIRole } from 'shared/interfaces';
import { $api } from 'shared/api';
import { TTableState, useTableState } from 'shared/states/useTableState';
import { useEffect, useMemo, useState } from 'react';
import Table from 'shared/components/table';
import { ColumnsType } from 'antd/es/table';
import { EMachineProperties } from 'shared/enums';
import { getWidth } from 'widgets/CarsTable/model/helpers';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { checkRoleAccess } from 'shared/helpers/checRoleAccess';

export const CarsTable = () => {
  const navigate = useNavigate();
  const { page, sorting, filters, totalElements } = useTableState(
    (state: TTableState) => state,
  );
  const setTotalElements = useTableState(
    (state: TTableState) => state.setTotalElements,
  );
  const [carsData, setCarsData] = useState<IMachin[]>([]);
  const [fields, setFields] = useState<(keyof typeof EMachineProperties)[]>([]);
  const setSorting = useTableState(state => state.setSorting);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ sorting, filters, page }: any) =>
      $api.post<IQueryData<IMachinesData>>('/cars', {
        sorting,
        filters,
        page,
      }),
    onSuccess: res => {
      setCarsData(res.data.resultData.entities);
      setFields(res.data.resultData.fields);
      setTotalElements(res.data.resultData.totalElements);
    },
    onError: err => {
      setCarsData([]);
    },
  });

  const columns: ColumnsType<typeof carsData> = useMemo(() => {
    return fields.map(field => ({
      title: EMachineProperties[field],
      dataIndex: field,
      key: field,
      width: getWidth(field),
      fixed: field === 'serialNumber' ? 'left' : undefined,
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

  const handleCarClick = ({ serialNumber }: any) => {
    return {
      onClick: () => {
        navigate(`/cars/${serialNumber}`);
      },
    };
  };

  const handleCreateCar = () => {
    navigate('/create-car');
  };

  useEffect(() => {
    mutate({ sorting, filters, page });
  }, [sorting, filters, page]);

  return (
    <div>
      <Table
        rowClick={handleCarClick}
        totalElements={totalElements}
        loading={isPending}
        columns={columns}
        data={carsData}
        onChange={onChangeTable}
        scroll={{ x: 'calc(700px + 100%)' }}
      />
      {checkRoleAccess(localStorage.getItem('role') as TIRole, 'createCar') && (
        <Button size={'large'} onClick={handleCreateCar}>
          Создать машину
        </Button>
      )}
    </div>
  );
};
