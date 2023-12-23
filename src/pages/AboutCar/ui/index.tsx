import { $api, API_URL } from 'shared/api';
import {
  IDirectory,
  IInfoItem,
  IMachin,
  IMachineData,
  IQueryData,
} from 'shared/interfaces';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';
import { Spin } from 'antd';
import { EMachineProperties } from 'shared/enums';
import { DirectoriesBlock } from 'features/DirectoriesBlock';
import { InfoBlock } from 'features/InfoBlock';

const DIRECTORIES: string[] = [
  'engineModel',
  'transModel',
  'controlBridgeModel',
  'driveAxleModel',
  'techModel',
];

export const AboutCar = () => {
  const { id: carId } = useParams();
  const [directoriesFromBack, setDirectoriesFromBack] = useState<IDirectory[]>(
    [],
  );
  const { data: carData, isFetching } = useQuery({
    queryKey: [carId],
    queryFn: () => {
      return $api.get<IQueryData<IMachineData>>(
        `${API_URL}/cars/serial-number/${carId}`,
      );
    },
    enabled: !!carId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (directories: string[]) => {
      return $api.post<IQueryData<IDirectory[]>>('/directories/list', {
        directories,
      });
    },
    onSuccess: res => {
      setDirectoriesFromBack(res.data.resultData);
    },
    onError: err => {},
    onSettled: () => {},
  });

  const carItemsInfo: IInfoItem[] = useMemo(() => {
    if (carData?.data?.resultData?.fields) {
      const filteredArray = carData.data.resultData.fields.filter(
        field => field !== 'equipment',
      );
      filteredArray.push('equipment');
      return filteredArray.map(field => ({
        title: EMachineProperties[field],
        name: carData.data.resultData.entity[field as keyof IMachin],
      }));
    }
    return [];
  }, [carData?.data?.resultData?.fields]);

  useEffect(() => {
    if (carData?.data?.resultData?.entity) {
      const carObj: IMachin = carData?.data?.resultData?.entity;
      const directoryArray: string[] = [];
      for (const field in carObj) {
        if (DIRECTORIES.includes(field)) {
          //@ts-ignore
          directoryArray.push(carObj[field as keyof carObj]);
        }
      }
      mutate(directoryArray);
    }
  }, [carData?.data?.resultData]);
  return (
    <div>
      <BreadcrumbToMain currentPageName={`Машина ${carId}`} />
      <Title name={`Информация о машине ${carId}`} />
      <div>
        {isPending || isFetching ? (
          <Spin fullscreen />
        ) : (
          <>
            <InfoBlock infoItems={carItemsInfo} />
            <DirectoriesBlock directories={directoriesFromBack} />
          </>
        )}
      </div>
    </div>
  );
};
