import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Button, Row, Col, Space, Divider, Spin } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import InputComponent from "../../components/InputComponent";
import TableComponent from "../../components/TableComponent";
import {
  getTaskList,
  saveTask,
  updateTask,
  deleteTask,
} from "../../redux/ducks/taskDuck";
import "react-toastify/dist/ReactToastify.css";

const ToDo = () => {
  interface ITable {
    id: string;
    key?: string;
    name: string;
    favorite?: boolean;
    create_date?: string;
  }
  type DataTableType = {
    id: string;
    key?: string;
    name: string;
    favorite?: boolean;
    create_date?: string;
  };

  const initialStateTask: DataTableType = {
    id: "",
    key: "",
    name: "",
    favorite: false,
    create_date: "",
  };
  const [task, setTask] = useState(initialStateTask);
  const [tasksSelected, setTasksSelected] = useState<ITable[]>([]);

  const taskStore = useSelector((state: RootStateOrAny) => state.task);
  const taskList: DataTableType[] = taskStore.tasks || [];

  const dataTable: DataTableType[] = taskList.map((element, idx) => {
    return { ...element, key: element.id };
  });

  const dispatch = useDispatch();

  const handlerChange = (event: any) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const saveRecord = async () => {
    const date = moment(new Date()).format("DD/MM/YYYY, h:mm:ss a");
    let toDoRecord: DataTableType = { ...task, create_date: date };

    if (!!task.name.trim()) {
      if (!task.id) {
        toDoRecord = { ...toDoRecord, favorite: false };
        dispatch(saveTask(toDoRecord));
        toast("New task added", {
          type: "success",
        });
      } else {
        dispatch(updateTask(toDoRecord));
        toast("Record Updated", {
          type: "success",
        });
      }
      clearForm();
    } else {
      toast("Field is required", {
        type: "error",
      });
    }
  };

  const handlerDelete = (
    task: DataTableType | any,
    massive: boolean = false
  ) => {
    const taskToDelete = [{ ...task }];

    if (window.confirm("Are you sure you want to delete this task?")) {
      const tasks = massive ? tasksSelected : taskToDelete;

      dispatch(deleteTask(tasks));

      toast("Record deleted", {
        type: "error",
      });
      setTasksSelected([]);
    }
  };

  const handlerFavorite = async (task: DataTableType) => {
    clearForm();
    dispatch(updateTask(task, true));
  };

  const getTaskRecord = (task: DataTableType) => {
    setTask(task);
  };

  const clearForm = () => {
    setTask(initialStateTask);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Create Date",
      dataIndex: "create_date",
      key: "create_date",
    },
  ];

  const columnsFilters: string[] = ["create_date"];

  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys: React.Key[], selectedRows: ITable[]) => {
      setTasksSelected(selectedRows);
    },
  };

  useEffect(() => {
    dispatch(getTaskList());
  }, []);

  return (
    <Fragment>
      <Row>
        <Col>
          <Row>
            <Col>
              <Space size={10}>
                <InputComponent
                  inputName="name"
                  inputValue={task.name}
                  inputType="text"
                  handlerChange={handlerChange}
                />
                <Button
                  shape="circle"
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={saveRecord}
                />
                {tasksSelected.length > 0 ? (
                  <Button
                    danger
                    shape="circle"
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handlerDelete(tasksSelected, true)}
                  />
                ) : null}
              </Space>
            </Col>
          </Row>
          <Divider plain></Divider>
          <Row>
            <Col>
              <Spin spinning={taskStore.fetching}>
                <TableComponent
                  columns={columns}
                  data={dataTable}
                  checkbox={rowSelection}
                  actionDelete={handlerDelete}
                  actionFavorite={handlerFavorite}
                  actionUpdate={getTaskRecord}
                  filters={columnsFilters}
                  tasksSelected={tasksSelected}
                />
              </Spin>
            </Col>
          </Row>
          <ToastContainer />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ToDo;
