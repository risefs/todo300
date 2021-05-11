import { Dispatch } from "react";
import { db } from "../../firebase";
import {
  TaskDispatchTypes,
  DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SAVE_DATA_SUCCESS,
  UPDATING_DATA_SUCCESS,
  DELETE_DATA_SUCCESS,
  InitialState,
  Tasks,
} from "./taskActionTypes";

//Constans
let initialState: InitialState = {
  fetching: false,
};

//Reducer
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, fetching: true };
    case GET_DATA_SUCCESS:
      return { ...state, fetching: false, tasks: action.payload };
    case GET_DATA_ERROR:
      return { ...state, fetching: false };
    case SAVE_DATA_SUCCESS:
      return { ...state, fetching: false };
    case UPDATING_DATA_SUCCESS:
      return { ...state, fetching: false };
    case DELETE_DATA_SUCCESS:
      return { ...state, fetching: false };
    default:
      return state;
  }
}

//actions
export const saveTask = (task: Tasks) => (
  dispatch: Dispatch<TaskDispatchTypes>
) => {
  try {
    dispatch({
      type: DATA_LOADING,
    });

    db.collection("tasks").doc().set(task);
    dispatch({
      type: UPDATING_DATA_SUCCESS,
    });
  } catch (error) {
    console.info(` Error: ${error} `);
    dispatch({
      type: GET_DATA_ERROR,
    });
  }
};

export const getTaskList = () => (dispatch: Dispatch<TaskDispatchTypes>) => {
  try {
    dispatch({
      type: DATA_LOADING,
    });

    db.collection("tasks").onSnapshot((querySnapshot) => {
      let tasks: any = [];
      querySnapshot.forEach((doc) => {
        const response = { ...doc.data(), id: doc.id };
        tasks.push(response);
      });
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: tasks,
      });
    });
  } catch (error) {
    console.info(` Error: ${error} `);
    dispatch({
      type: GET_DATA_ERROR,
    });
  }
};

export const updateTask = (task: Tasks, isFavorite: boolean = false) => (
  dispatch: Dispatch<TaskDispatchTypes>
) => {
  try {
    dispatch({
      type: DATA_LOADING,
    });

    let toDo: Tasks = task;
    if (isFavorite) {
      toDo = { ...task, favorite: !task.favorite };
    }

    db.collection("tasks").doc(task.id).update(toDo);
    dispatch({
      type: UPDATING_DATA_SUCCESS,
    });
  } catch (error) {
    console.info(` Error: ${error} `);
    dispatch({
      type: GET_DATA_ERROR,
    });
  }
};

export const deleteTask = (task: Tasks | any) => (
  dispatch: Dispatch<TaskDispatchTypes>
) => {
  try {
    dispatch({
      type: DATA_LOADING,
    });
    let record: any;
    for (record in task) {
      db.collection("tasks").doc(task[record].id).delete();
    }
    dispatch({
      type: DELETE_DATA_SUCCESS,
    });
  } catch (error) {
    console.info(` Error: ${error} `);
    dispatch({
      type: GET_DATA_ERROR,
    });
  }
};
