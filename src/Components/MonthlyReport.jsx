import React, { useState } from 'react';

function MonthlyReport({ entries, isLoading }) {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const filteredEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.addedDate);
        const entryYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth() + 1;

        const numSelectedYear = parseInt(selectedYear, 10);
        const numSelectedMonth = parseInt(selectedMonth, 10);

        return entryYear === numSelectedYear && entryMonth === numSelectedMonth;
    });

    return (
        <div className="container">
            <h2>Calorie Report</h2>
            <div>
                <select
                    className="select-input"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Year</option>
                    {[2019,2020, 2021, 2022, 2023, 2024,2025,2026,2027,2028,2029].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
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
                            <td>{entry.addedDate.split("T")[0]}</td>
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
