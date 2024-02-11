import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";

const Drop = ({ title, param, options }) => {
  const [selected, setSelected] = useState(`${title}`);

  const handleSelected = (option) => {
    setSelected(option);
  };

  const dropdownStyles = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "black",
  };

  const dropdownMenuStyles = {
    fontSize: "20px",
    borderColor: "transparent",
    color: "black",
  };

  return (
    <div className="dropdown">
      <Dropdown>
        <Dropdown.Toggle
          style={dropdownStyles}
          variant="secondary"
          id="dropdown-basic"
          className="navbar-link dropdown"
        >
          {selected}
        </Dropdown.Toggle>

        <Dropdown.Menu style={dropdownMenuStyles}>
          {options.map((option, index) => (
            <Dropdown.Item
              key={index}
              className="dropdown-item"
              onClick={() => {
                handleSelected(option);
              }}
              href={`${param}${option}`}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Drop;
