import React, { Fragment, useState } from "react";
import { Table, Space, Input, Button } from "antd";
import {
  HeartTwoTone,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

interface ITable {
  id: string;
  key?: string;
  name: string;
  favorite?: boolean;
  create_date?: string;
}

interface ISearch {
  searchText?: string;
  searchedColumn?: string;
}
interface IDropdown {
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: any;
  clearFilters: () => void;
}

interface TableProps {
  columns: any[];
  data: any[];
  filters?: string[];
  checkbox?: any;
  actionDelete?: any;
  actionFavorite?: any;
  actionUpdate?: any;
  tasksSelected?: any[];
}
const TableComponent: React.FunctionComponent<TableProps> = ({
  columns,
  data = [],
  filters = [],
  checkbox,
  actionDelete,
  actionFavorite,
  actionUpdate,
  tasksSelected = [],
}) => {
  const { Column } = Table;

  const [search, setSearch] = useState<ISearch>({
    searchText: "",
    searchedColumn: "",
  });

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: IDropdown) => (
      <div style={{ padding: 8 }}>
        <Input
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearch({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text: string) =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: string,
    confirm: any,
    dataIndex: string
  ) => {
    confirm();
    setSearch({ searchText: selectedKeys[0], searchedColumn: dataIndex });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearch({ searchText: "" });
  };

  return (
    <Fragment>
      <Table
        dataSource={data}
        rowSelection={checkbox}
        pagination={{ pageSize: 5 }}
      >
        {!!columns &&
          columns.map((element) =>
            filters.length > 0 && filters.includes(element.dataIndex) ? (
              <Column
                title={element.title}
                dataIndex={element.dataIndex}
                key={element.key}
                {...getColumnSearchProps(element.dataIndex)}
              />
            ) : (
              <Column
                title={element.title}
                dataIndex={element.dataIndex}
                key={element.key}
              />
            )
          )}
        {!!actionDelete || !!actionFavorite || !!actionUpdate ? (
          <Column
            title="Action"
            key="action"
            render={(text, record: any) => (
              <Fragment>
                <Space size="middle">
                  {!!actionUpdate ? (
                    <a
                      onClick={() => {
                        actionUpdate(record);
                      }}
                    >
                      <EditOutlined />
                    </a>
                  ) : null}
                  {!!actionFavorite ? (
                    <a
                      onClick={() => {
                        actionFavorite(record);
                      }}
                    >
                      <HeartTwoTone
                        twoToneColor={record.favorite ? "#ff0000" : undefined}
                      />
                    </a>
                  ) : null}
                  {!!actionDelete ? (
                    tasksSelected.length === 0 ? (
                      <a
                        onClick={() => {
                          actionDelete(record);
                        }}
                      >
                        <DeleteOutlined twoToneColor="#ff0000" />
                      </a>
                    ) : (
                      <DeleteOutlined
                        style={{ color: "#9BA4A7", cursor: "not-allowed" }}
                      />
                    )
                  ) : null}
                </Space>
              </Fragment>
            )}
          />
        ) : null}
      </Table>
    </Fragment>
  );
};
export default TableComponent;
