/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

import React, { useState } from 'react';

// The MonthlyReport component displays a filtered report of calorie entries based on selected month and year.
// It receives `entries` (an array of calorie intake records) and `isLoading` (a boolean indicating data loading state) as props.
function MonthlyReport({ entries, isLoading }) {
    // State hooks for storing the user's selected year and month for the report.
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // Filters the entries based on the selected year and month.
    const filteredEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.addedDate); // Converts the entry's date to a Date object.
        const entryYear = entryDate.getFullYear(); // Extracts the year from the entry date.
        const entryMonth = entryDate.getMonth() + 1; // Extracts the month (1-12) from the entry date.

        const numSelectedYear = parseInt(selectedYear, 10); // Converts the selected year to a number.
        const numSelectedMonth = parseInt(selectedMonth, 10); // Converts the selected month to a number.

        // Returns true if the entry's year and month match the selected year and month.
        return entryYear === numSelectedYear && entryMonth === numSelectedMonth;
    });

    return (
        <div className="container">
            <h2>Calorie Report</h2>
            <div>
                {/* Year selection dropdown */}
                <select
                    className="select-input"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Year</option>
                    {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                {/* Month selection dropdown */}
                <select
                    className="select-input"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            {/* Displays a loading message or the filtered entries */}
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
                            {/* Splits the ISO string to display only the date part */}
                            <td>{entry.addedDate.split("T")[0]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No entries found.</p> // Message displayed when no entries match the filter criteria.
            )}
        </div>
    );
}

export default MonthlyReport;

