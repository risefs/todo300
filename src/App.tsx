import React from "react";
import { Row, Col } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Nav from "./components/Nav";

function App() {
  const style = {
    padding: "8px 0",
    container: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      padding:"8px"
    },
  };

  return (
    <BrowserRouter>
      <Row>
        <Col span={8} offset={8}>
          <div style={style.container}>
            <Col style={style}>
              <Nav />
            </Col>
            <Col>
              <AppRouter />
            </Col>
          </div>
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
