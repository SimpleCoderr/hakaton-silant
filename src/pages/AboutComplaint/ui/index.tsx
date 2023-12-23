import { useParams } from 'react-router-dom';
import { $api, API_URL } from 'shared/api';
import {
  IComplaint,
  IComplaintData,
  IDirectory,
  IInfoItem,
  IQueryData,
} from 'shared/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { EComplaintProperties } from 'shared/enums';
import BreadcrumbToMain from 'shared/components/BreadcrumbToMain';
import Title from 'shared/components/Title';
import { Spin } from 'antd';
import { InfoBlock } from 'features/InfoBlock';
import { DirectoriesBlock } from 'features/DirectoriesBlock';

const DIRECTORIES: string[] = ['recoveryMethod', 'rejectNode'];

export const AboutComplaint = () => {
  const { id: complaintId } = useParams();
  const [directoriesFromBack, setDirectoriesFromBack] = useState<IDirectory[]>(
    [],
  );
  const { data: complaintData, isFetching } = useQuery({
    queryKey: [complaintId],
    queryFn: () => {
      return $api.get<IQueryData<IComplaintData>>(
        `${API_URL}/complaints/${complaintId}`,
      );
    },
    enabled: !!complaintId,
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
    if (complaintData?.data?.resultData?.fields) {
      return complaintData.data.resultData.fields
        .filter(field => field !== 'id')
        .map(field => ({
          title: EComplaintProperties[field],
          name: String(complaintData.data.resultData.entity[field]),
        }));
    }
    return [];
  }, [complaintData?.data?.resultData?.fields]);

  useEffect(() => {
    if (complaintData?.data?.resultData?.entity) {
      const inspectionObj: IComplaint = complaintData?.data?.resultData?.entity;
      const directoryArray: string[] = [];
      for (const field in inspectionObj) {
        if (DIRECTORIES.includes(field)) {
          //@ts-ignore
          directoryArray.push(inspectionObj[field as keyof inspectionObj]);
        }
      }
      mutate(directoryArray);
    }
  }, [complaintData?.data?.resultData]);
  return (
    <div>
      <BreadcrumbToMain
        currentPageName={`Рекламация машины ${
          complaintData?.data?.resultData?.entity?.carId ?? ''
        }`}
      />
      <Title
        name={`Информация о рекламации машины ${
          complaintData?.data?.resultData?.entity?.carId ?? ''
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
