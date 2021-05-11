import React, { Fragment } from "react";
import { Input } from "antd";


interface InputProps {
  inputName: string;
  inputValue?: string;
  inputType: string;
  handlerChange: any;
}
const InputComponent: React.FunctionComponent<InputProps> = ({
  inputName,
  inputValue = "",
  inputType,
  handlerChange,
}) => {
  
  return (
    <Fragment>
      <div>
        <Input
          onChange={handlerChange}
          type={inputType}
          name={inputName}
          value={inputValue}
        />
      </div>
    </Fragment>
  );
};

export default InputComponent;
