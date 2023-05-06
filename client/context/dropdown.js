import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import React, { useState } from "react";

const dropdown = ({ title, param, options }) => {
  const [selected, setSelected] = useState(`${title}`);

  const handleSelected = (option) => {
    setSelected(option);
  };

  return (
    <div className="dropdown">
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="dropdown"
        >
          {selected}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
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
