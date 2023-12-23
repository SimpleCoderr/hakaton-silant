import styled from 'styled-components';
import DirectoryItem from 'shared/components/DirectoryItem';
import { IDirectory } from 'shared/interfaces';

export const DirectoriesBlock = ({
  directories,
}: {
  directories: IDirectory[];
}) => {
  return (
    <div>
      <TitleDirectory>Справочники</TitleDirectory>
      <DirectoryItems>
        {directories.map(directory => (
          <DirectoryItem key={directory.name} {...directory} />
        ))}
      </DirectoryItems>
    </div>
  );
};

const TitleDirectory = styled.div`
  font-size: 26px;
  width: 100%;
  font-weight: 700;
  margin-bottom: 15px;
`;

const DirectoryItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
