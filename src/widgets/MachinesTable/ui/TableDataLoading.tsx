import {Skeleton} from "antd";
import styled from "styled-components";

const TableDataLoading = () => {
    return (
        <SkeletonWrapper>
            <Skeleton loading active paragraph={{rows: 10}} title={false}/>
        </SkeletonWrapper>
    )
}

export default TableDataLoading;

const SkeletonWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`