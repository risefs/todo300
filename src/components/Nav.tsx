import React, { useState } from "react";
import { Menu } from "antd";
import { UnorderedListOutlined, HeartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const [menuCurrent, setMenuCurrent] = useState<string>("");
  
  let history = useHistory();

  const handleClick = (e: any) => {
     history.push(`/${e.key}`);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[menuCurrent]} mode="horizontal">
      <Menu.Item key="todo" icon={<UnorderedListOutlined />}>
        To Do
      </Menu.Item>
      <Menu.Item key="favorites" icon={<HeartOutlined />}>
        Favorites
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
