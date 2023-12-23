import styled from 'styled-components';
import {
  IDirectory,
  IMachineForAnonimous,
  IMachineForAnonimousData,
  IQueryData,
} from 'shared/interfaces';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TableRow from 'widgets/MachinesTable/ui/TableRow';
import TableDataLoading from 'widgets/MachinesTable/ui/TableDataLoading';
import { API_URL } from 'shared/api';
import DirectoryModal from 'widgets/MachinesTable/ui/modals/DirectoryModal';

type TMachineProperties = {
  title: string;
  value: string;
};

interface IMachineTable {
  serialNumber: string;
}

const clickableRow: string[] = [
  'techModel',
  'engineModel',
  'transModel',
  'driveAxleModel',
  'controlBridgeModel',
];

export const MachineTable = ({ serialNumber }: IMachineTable) => {
  const [directory, setDirectory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: machineData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [serialNumber],
    queryFn: () => {
      return axios.get<IQueryData<IMachineForAnonimousData>>(
        `${API_URL}/cars/serial-number-anonymize/${serialNumber}`,
      );
    },
    enabled: !!serialNumber,
    retry: false,
  });

  const machinePropertiesArray: TMachineProperties[] = useMemo(() => {
    const array: TMachineProperties[] = [];
    if (machineData?.data?.resultData?.entity) {
      for (const machineProperty in machineData.data.resultData.entity) {
        if (
          Object.prototype.hasOwnProperty.call(
            machineData.data.resultData.entity,
            machineProperty,
          )
        ) {
          array.push({
            title: machineProperty,
            value: String(
              machineData.data.resultData.entity?.[
                machineProperty as keyof IMachineForAnonimous
              ],
            ),
          });
        }
      }
    }

    return array;
  }, [machineData]);

  const { data: directoryData, isFetching: fetchingDirectory } = useQuery({
    queryKey: [directory],
    queryFn: () => {
      return axios.get<IQueryData<IDirectory>>(
        `${API_URL}/cars/directory/${directory}`,
      );
    },
    enabled: !!directory,
  });

  const findDirectoryInfo = (directory: string) => {
    setDirectory(directory);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!serialNumber) {
    return <DoSearch>Начните поиск машины по заводскому номеру</DoSearch>;
  } else if (isLoading || isFetching) {
    return <TableDataLoading />;
  } else if (isError) {
    return (
      <DoSearch>Машины с серийным номером {serialNumber} не найдено</DoSearch>
    );
  }

  return (
    <TableWrapper>
      {machinePropertiesArray.map((property, index) => (
        <TableRow
          onClick={findDirectoryInfo}
          {...property}
          isOdd={!!((index + 1) % 2)}
          key={property.title}
          isClickable={clickableRow.some(rowName => rowName === property.title)}
        />
      ))}
      <DirectoryModal
        directory={directoryData?.data?.resultData}
        isOpen={isOpen}
        closeModal={closeModal}
        directoryDataLoading={fetchingDirectory}
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: #ebe6d6 2px solid;
`;

const DoSearch = styled.div`
  text-decoration: underline;
  font-size: 18px;
`;
