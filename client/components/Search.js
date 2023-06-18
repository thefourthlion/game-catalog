import React, { useState } from "react";
import Input from "./Input";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="Search">
      <div className="container">
        <form>
          <Input placeholder="Search Games" type="text" />
        </form>
      </div>
    </div>
  );
};
export default Search;
