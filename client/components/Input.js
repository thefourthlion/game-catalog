import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import React from "react";
const Input = ({ placeholder, type }) => {
  return (
    <div className="Input">
      <div className="container">
        <FloatingLabel
          className="search-input-label form-label"
          label={placeholder}
        >
          <Form.Control
            className="search-input-form-control form-input"
            type={type}
            placeholder={placeholder}
          />
        </FloatingLabel>
      </div>
    </div>
  );
};
export default Input;
