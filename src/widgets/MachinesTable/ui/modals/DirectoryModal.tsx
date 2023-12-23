import { Modal } from 'antd';
import styled from 'styled-components';
import { IDirectory } from 'shared/interfaces';
import AdaptiveLoader from 'shared/components/AdaptiveLoader';

interface IDirectoryModal {
  directory?: IDirectory;
  isOpen: boolean;
  closeModal: () => void;
  directoryDataLoading: boolean;
}

const DirectoryModal = ({
  directory,
  isOpen,
  closeModal,
  directoryDataLoading,
}: IDirectoryModal) => {
  return (
    <Modal
      centered
      footer={null}
      title={'Описание справочника'}
      onCancel={closeModal}
      open={isOpen}
    >
      <ContentWrapper>
        {directoryDataLoading ? (
          <AdaptiveLoader />
        ) : (
          <>
            <RowWrapper>
              <Title>Название:</Title>
              <Property>{directory?.name}</Property>
            </RowWrapper>
            <RowWrapper>
              <Title>Описание:</Title>
              <Property>
                {directory?.description ? directory?.description : '-'}
              </Property>
            </RowWrapper>
          </>
        )}
      </ContentWrapper>
    </Modal>
  );
};

export default DirectoryModal;

const ContentWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  font-weight: bold;
  min-width: 100px;
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const Property = styled.div`
  min-width: 200px;
  width: 50%;
`;
