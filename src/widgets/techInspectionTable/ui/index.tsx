import { useMutation } from '@tanstack/react-query';
import {
  IQueryData,
  ITechInspection,
  ITechInspectionsData,
  TIRole,
} from 'shared/interfaces';
import { $api } from 'shared/api';
import { TTableState, useTableState } from 'shared/states/useTableState';
import { useEffect, useMemo, useState } from 'react';
import Table from 'shared/components/table';
import { ColumnsType } from 'antd/es/table';
import { ETechInspectionProperties } from 'shared/enums';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { checkRoleAccess } from 'shared/helpers/checRoleAccess';

export const TechInspectionTable = () => {
  const navigate = useNavigate();
  const { page, sorting, filters, totalElements } = useTableState(
    (state: TTableState) => state,
  );
  const setTotalElements = useTableState(
    (state: TTableState) => state.setTotalElements,
  );
  const [inspectionsData, setInspectionsData] = useState<ITechInspection[]>([]);
  console.log(inspectionsData);
  const [fields, setFields] = useState<
    (keyof typeof ETechInspectionProperties)[]
  >([]);
  const setSorting = useTableState(state => state.setSorting);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ sorting, filters, page }: any) =>
      $api.post<IQueryData<ITechInspectionsData>>('/inspections', {
        sorting,
        filters,
        page,
      }),
    onSuccess: res => {
      const data = res.data.resultData.entities;
      setInspectionsData(data);
      setFields(res.data.resultData.fields.filter(field => field !== 'id'));
      setTotalElements(res.data.resultData.totalElements);
    },
    onError: err => {
      setInspectionsData([]);
    },
  });

  const columns: ColumnsType<typeof inspectionsData> = useMemo(() => {
    return fields.map(field => ({
      title: ETechInspectionProperties[field],
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

  const handleInspectionClick = (record: any) => {
    return {
      onClick: () => {
        console.log(record);
        navigate(`/inspections/${record.id}`);
      },
    };
  };

  const handleAddInspection = () => {
    navigate('/inspections/add');
  };

  useEffect(() => {
    mutate({ sorting, filters, page });
  }, [sorting, filters, page]);

  return (
    <div>
      <Table
        rowClick={handleInspectionClick}
        totalElements={totalElements}
        loading={isPending}
        columns={columns}
        data={inspectionsData}
        onChange={onChangeTable}
      />
      {checkRoleAccess(
        localStorage.getItem('role') as TIRole,
        'addInspection',
      ) && (
        <Button size={'large'} onClick={handleAddInspection}>
          Создать заявку на ТО
        </Button>
      )}
    </div>
  );
};
