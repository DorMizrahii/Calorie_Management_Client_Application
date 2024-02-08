import React, { useEffect, useState } from "react";
import { CalorieDB } from "../idb"; // Ensure this path matches where you've defined CalorieDB

function AddCalorieForm({ setEntries }) {
  const [category, setCategory] = useState("BREAKFAST");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [db, setDb] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Initialize the IndexedDB
  useEffect(() => {
    async function initDB() {
      try {
        const database = new CalorieDB();
        await database.openDB("caloriesdb", 1);
        setDb(database);
      } catch (error) {
        console.error("Failed to open database", error);
        setError('Failed to initialize database.');
      }
    }
    initDB();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!calories || calories <= 0) {
      setError('Please enter a valid calorie amount.');
      setIsSubmitting(false);
      return;
    }

    if (db) {
      try {
        const entry = {
          category,
          calories: Number(calories),
          description,
          addedDate: new Date().toISOString(), // Use ISO string for consistency
        };

        await db.addCalories(entry);
        setEntries((prevEntries) => [...prevEntries, entry]);
        // Reset form fields
        setCalories("");
        setDescription("");
        setIsSubmitting(false);
        console.log("Entry added successfully");
      } catch (error) {
        console.error("Error adding entry", error);
        setError('Failed to add entry.');
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
