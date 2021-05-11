import React from "react";
import logo from "./logo.svg";
import { Row, Col, Space } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Nav from "./components/Nav";

function App() {
  const style = { padding: "8px 0" };

  return (
    <BrowserRouter>
      <Row>
        <Col span={8} offset={8}>
          <Col style={style}>
            <Nav />
          </Col>
          <Col>
            <AppRouter />
          </Col>
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
