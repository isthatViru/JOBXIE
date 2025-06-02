import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Addjob.css";

const Addjob = () => {
  const [data, setData] = useState({
    title: "",
    company: "",
    location: ""
  });

  const nav = useNavigate();
  const { id } = useParams(); // Get ID from URL for edit

  // Load existing job if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/jobs/${id}`)
        .then(res => setData(res.data))
        .catch(err => console.error("Failed to load job for edit", err));
    }
  }, [id]);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveForm = async (e) => {
    e.preventDefault();

    const { company, title, location } = data;
    if (!company || !title || !location) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      if (id) {
        // Edit mode
        await axios.put(`http://localhost:3000/jobs/${id}`, data);
        alert("Updated Successfully!");
      } else {
        // Create mode
        await axios.post("http://localhost:3000/jobs", data);
        alert("Submitted Successfully!");
      }
      nav("/Addjobcard");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <form className="form-container" onSubmit={saveForm}>
      <h2 className="form-title">{id ? "Edit Job" : "Add Job"}</h2>

      <label htmlFor="company">Company Name</label>
      <input
        type="text"
        name="company"
        id="company"
        value={data.company}
        onChange={dataHandler}
        placeholder="Company name"
        required
      />

      <label htmlFor="title">Job Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={data.title}
        onChange={dataHandler}
        placeholder="e.g. React Developer"
        required
      />

      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={data.location}
        onChange={dataHandler}
        placeholder="Job location"
        required
      />

      <button type="submit" className="submit-btn">
        {id ? "Update Job" : "Save Job"}
      </button>
    </form>
  );
};

export default Addjob;
