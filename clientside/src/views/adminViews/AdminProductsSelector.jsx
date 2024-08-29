import React, { useState } from "react";
import "./admindashboard.css"; // Importing the CSS file for styling


const AdminProductsSelector = () => {
 
      const [inputs, setInputs] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
      });
    
      const [notification, setNotification] = useState({
        visible: false,
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const inputValues = Object.values(inputs).map((input) =>
          input.split(",").map((num) => ({ id: parseInt(num.trim(), 10) }))
        );
    
        // // Check if any input is empty
        if (
          inputValues.some((array) => array.some((subArray) => isNaN(subArray.id)))
        ) {
          alert("All inputs are required and must be valid numbers.");
          return;
        }
    
        try {
          const response = await fetch("http://localhost:5000/api/admin/submitid", {
            method: "POST",
            credentials: "include", // to include cookies in the request
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValues),
          });
    
          const data = await response.json();
          if (response.ok) {
            showNotification("Submission successful!", true);
            // Clear the form fields
            setInputs({
              input1: "",
              input2: "",
              input3: "",
              input4: "",
              input5: "",
              input6: "",
            });
          } else {
            showNotification(`Error: ${data.result || "Failed to submit"}`, false);
          }
        } catch (error) {
          showNotification(`Error: ${error.message}`, false);
        }
      };
    
      const showNotification = (message, isSuccess) => {
        setNotification({ visible: true, message, isSuccess });
        setTimeout(() => {
          setNotification({ visible: false, message: "" });
        }, 3000);
      };
    
      return (
        <div className="dashboard-admin">
          <h2>Dashboard Admin</h2>
          <form onSubmit={handleSubmit}>
            {Object.entries(inputs).map(([key, value], index) => (
              <div key={key} className="input-container">
                <label>{`Input ${index + 1}:`}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder="Enter numbers separated by commas"
                />
              </div>
            ))}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
          {notification.visible && (
            <div
              className={`notification ${
                notification.isSuccess ? "success" : "error"
              }`}
            >
              {notification.message}
            </div>
          )}
        </div>
      );
    };
    
export default AdminProductsSelector