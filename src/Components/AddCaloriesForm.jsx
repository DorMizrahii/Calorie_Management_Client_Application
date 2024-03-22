/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

import React, { useEffect, useState } from "react";
import {toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

// The AddCalorieForm component allows users to add their calorie intake details.
// It expects a `setEntries` function prop to update the parent component's state.
function AddCalorieForm({ setEntries }) {
  // State variables for the form fields and app status.
  const [category, setCategory] = useState("BREAKFAST");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [db, setDb] = useState(null); // For storing the IndexedDB instance.
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicates form submission status.
  const [error, setError] = useState(''); // For displaying any error messages.

  // useEffect hook to initialize the IndexedDB once component mounts.
  useEffect(() => {
    async function initDB() {
      try {
          const dataBase = await window.idb.openCaloriesDB("caloriesdb", 1);
          setDb(dataBase);
      } catch (error) {
        console.error("Failed to open dataBase", error);
        setError('Failed to initialize dataBase.');
      }
    }
    initDB();
  }, []);

  // Handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submit action.
    setIsSubmitting(true);
    setError('');

    // Validate the calories input.
    if (!calories || calories <= 0) {
      setError('Please enter a valid calorie amount.');
      setIsSubmitting(false);
      return;
    }

    // Proceed if the database is initialized.
    if (db) {
      try {
        const entry = {
          category,
          calories: Number(calories),
          description,
          addedDate: new Date().toISOString(),
        };

        await db.addCalories(entry); // Adds the entry to the IndexedDB.
        setEntries((prevEntries) => [...prevEntries, entry]); // Updates the parent component's state.
        // Reset form fields after submission.
        setCategory("BREAKFAST");
        setCalories("");
        setDescription("");
        toast.success("Entry added successfully!"); // Use toast for success notification
        setIsSubmitting(false);
        console.log("Entry added successfully");
      } catch (error) {
        console.error("Error adding entry", error);
        setError('Failed to add entry.');
        toast.error("Failed to add entry.") // Use toast for error notification
        setIsSubmitting(false);
      }
    } else {
      setError('Database not initialized.');
      setIsSubmitting(false);
    }
  };

  return (
      <div className="container mt-5">
        <h2>Add Calorie Intake</h2>
        < ToastContainer /> {/* Toast container that displays the toast */}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="BREAKFAST">BREAKFAST</option>
              <option value="LUNCH">LUNCH</option>
              <option value="DINNER">DINNER</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input type="number" className="form-control" id="calories" value={calories} placeholder="Enter calorie amount" onChange={(e) => setCalories(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
  );
}

export default AddCalorieForm;
