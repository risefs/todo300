import React, { useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useSelector, RootStateOrAny } from "react-redux";
import TableComponent from "../../components/TableComponent";

const Favorites = () => {
  const taskStore = useSelector((state: RootStateOrAny) => state.task);
  const taskFavorites = taskStore.tasks.filter(
    (element: any) => element.favorite
  );

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

  return (
    <Row>
      <Col>
        <Spin spinning={taskStore.fetching}>
          <TableComponent columns={columns} data={taskFavorites} />
        </Spin>
      </Col>
    </Row>
  );
};

export default Favorites;
