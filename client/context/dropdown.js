import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import React, { useState } from "react";

const dropdown = ({ title, param, options }) => {
  const [selected, setSelected] = useState(`${title}`);

  const handleSelected = (option) => {
    setSelected(option);
  };

  const dropdownStyles = {
    minWidth: "165px",
    fontWeight: "bold",
    fontSize: "28px",
    position: "relative",
    bottom: "6px",
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "black",
  };

  const dropdownMenuStyles = {
    minWidth: "165px",
    fontWeight: "bold",
    fontSize: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
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
          className="dropdown"
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
            >
              <Link href={`${param}${option}`}>{option}</Link>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default dropdown;
