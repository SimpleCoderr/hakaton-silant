import { useParams } from 'react-router-dom';
import { $api, API_URL } from 'shared/api';
import {
  IDirectory,
  IInfoItem,
  IQueryData,
  ITechInspection,
  ITechInspectionData,
} from 'shared/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { ETechInspectionProperties } from 'shared/enums';
import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';
import { Spin } from 'antd';
import { DirectoriesBlock } from 'features/DirectoriesBlock';
import { InfoBlock } from 'features/InfoBlock';

const DIRECTORIES: string[] = ['type'];

export const AboutTechInspection = () => {
  const { id: inspectionId } = useParams();
  const [directoriesFromBack, setDirectoriesFromBack] = useState<IDirectory[]>(
    [],
  );
  const { data: inspectionData, isFetching } = useQuery({
    queryKey: [inspectionId],
    queryFn: () => {
      return $api.get<IQueryData<ITechInspectionData>>(
        `${API_URL}/inspections/${inspectionId}`,
      );
    },
    enabled: !!inspectionId,
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

  const inspectionItemsInfo: IInfoItem[] = useMemo(() => {
    if (inspectionData?.data?.resultData?.fields) {
      return inspectionData.data.resultData.fields
        .filter(field => field !== 'id')
        .map(field => ({
          title: ETechInspectionProperties[field],
          name: String(
            inspectionData.data.resultData.entity[
              field as keyof ITechInspection
            ],
          ),
        }));
    }
    return [];
  }, [inspectionData?.data?.resultData?.fields]);

  useEffect(() => {
    if (inspectionData?.data?.resultData?.entity) {
      const inspectionObj: ITechInspection =
        inspectionData?.data?.resultData?.entity;
      const directoryArray: string[] = [];
      for (const field in inspectionObj) {
        if (DIRECTORIES.includes(field)) {
          //@ts-ignore
          directoryArray.push(inspectionObj[field as keyof inspectionObj]);
        }
      }
      mutate(directoryArray);
    }
  }, [inspectionData?.data?.resultData]);
  return (
    <div>
      <BreadcrumbToMain
        currentPageName={`Тех. обслуживание машины ${
          inspectionData?.data?.resultData?.entity?.carId ?? ''
        }`}
      />
      <Title
        name={`Информация о тех. обслуживании машины ${
          inspectionData?.data?.resultData?.entity?.carId ?? ''
        }`}
      />
      <div>
        {isPending || isFetching ? (
          <Spin fullscreen />
        ) : (
          <>
            <InfoBlock infoItems={inspectionItemsInfo} />
            <DirectoriesBlock directories={directoriesFromBack} />
          </>
        )}
      </div>
    </div>
  );
};
