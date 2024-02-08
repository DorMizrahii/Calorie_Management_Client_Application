import React, { useState } from 'react';

function MonthlyReport({ entries, isLoading }) {
    const [date, setDate] = useState('');

    const filteredEntries = entries.filter((entry) => {
        // First, convert addedDate string to a Date object
        const entryDate = new Date(entry.addedDate);
        const entryYear = entryDate.getFullYear(); // Extract the year
        const entryMonth = entryDate.getMonth() + 1; // Extract the month (getMonth() returns 0-11)

        // Parse the selected date to extract the year and month
        const [selectedYear, selectedMonth] = date.split('-').map(num => parseInt(num, 10));

        // Compare the year and the month using strict equality
        return entryYear === selectedYear && entryMonth === selectedMonth;
    });

    return (
        <div className="container mt-5">
            <h2>Monthly Report</h2>
            <input
                type="date"
                id="start"
                name="trip-start"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : filteredEntries.length > 0 ? (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Calories</th>
                        <th>Description</th>
                        <th>Date Added</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.category}</td>
                            <td>{entry.calories}</td>
                            <td>{entry.description}</td>
                            <td>{entry.addedDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No entries found.</p>
            )}
        </div>
    );
}

export default MonthlyReport;
