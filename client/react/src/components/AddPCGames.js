import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const AddPCGames = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3017/api/PCGames/create",
        {
          title,
          image,
          link,
        }
      );
      console.log("Game added successfully:", response.data);
      refreshPage();
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="AddPCGames">
      <div className="container">
        <h1 className="content-header">AddPCGames</h1>

        <FloatingLabel className="search-input-label form-label" label="Title">
          <Form.Control
            className="search-input-form-control form-input"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          className="search-input-label form-label"
          label="Image Link"
        >
          <Form.Control
            className="search-input-form-control form-input"
            type="text"
            placeholder="Image Link"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          className="search-input-label form-label"
          label="Download Link"
        >
          <Form.Control
            className="search-input-form-control form-input"
            type="text"
            placeholder="Download Link"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </FloatingLabel>

        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default AddPCGames;
