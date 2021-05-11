export const DATA_LOADING = "DATA_LOADING";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATE_ERROR";
export const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";
export const UPDATING_DATA_SUCCESS = "UPDATING_DATA_SUCCESS";
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS";

export type Tasks = {
  id: string;
  key?: string;
  name: string;
  favorite?: boolean;
  create_date?: string;
};

export interface GetData {
  type: typeof DATA_LOADING;
}

export interface GetDataSuccess {
  type: typeof GET_DATA_SUCCESS;
  payload: {
    tasks: Tasks[];
  };
}

export interface GetDataError {
  type: typeof GET_DATA_ERROR;
}

export interface SaveDataSuccess {
  type: typeof SAVE_DATA_SUCCESS;
}

export interface UpdatingDataSuccess {
  type: typeof UPDATING_DATA_SUCCESS;
}

export interface DeleteDataSuccess {
  type: typeof DELETE_DATA_SUCCESS;
}

export interface InitialState {
  fetching: boolean;
  tasks?: Tasks;
}

export type TaskDispatchTypes =
  | GetData
  | GetDataSuccess
  | GetDataError
  | SaveDataSuccess
  | UpdatingDataSuccess
  | DeleteDataSuccess
  | InitialState;
