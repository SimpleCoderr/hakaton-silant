import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

export const DEFAULT_LIMIT = window.innerWidth < 576 ? 5 : 10;

const INITIAL_STATE = {
  filters: {},
  sorting: {},
  totalElements: 0,
  page: {
    amountOfElements: DEFAULT_LIMIT,
    pageNumber: 0,
  },
};

export type TTableState = {
  filters: any;
  sorting: any;
  totalElements: number;
  page: {
    pageNumber: number | undefined;
    amountOfElements: number | undefined;
  };
  setPage: (pageNumber: number) => void;
  setTotalElements: (totalElements: number) => void;
  setFilters: (filtersObj: any) => void;
  setSorting: (sortingObj: any) => void;
  reset: () => void;
};
export const useTableState = create<TTableState>()(
  devtools(
    set => ({
      ...INITIAL_STATE,
      setPage: pageNumber => {
        set(
          produce((draft: TTableState) => {
            draft.page.pageNumber = pageNumber;
          }),
        );
      },
      setTotalElements: totalElements => {
        set(
          produce((draft: TTableState) => {
            draft.totalElements = totalElements;
          }),
        );
      },
      setFilters: filtersObj => {
        set(
          produce((draft: TTableState) => {
            draft.filters = filtersObj;
          }),
        );
      },
      setSorting: sortingObj => {
        set(
          produce((draft: TTableState) => {
            draft.sorting = sortingObj;
          }),
        );
      },
      reset: () => {
        set({
          ...INITIAL_STATE,
        });
      },
    }),
    {
      anonymousActionType: 'useTableState action',
      name: 'useTableState',
    },
  ),
);
