import React from 'react';
import './viewstatus.css'; // Import CSS file for styling

const ViewStatus = () => {
    // Hard-coded leave data (you can replace this with actual data from your backend)
    const leaves = [
        { type: 'Vacation', status: 'Approved' },
        { type: 'Sick Leave', status: 'Approved' },
        { type: 'Personal Leave', status: 'Approved' },
        { type: 'Maternity Leave', status: 'Approved' },
    ];

    return (
        <div className="leave-status-container">
            <h1>Employee Leave Status</h1>
            <ul className="leave-list">
                {leaves.map((leave, index) => (
                    <li key={index}>
                        {leave.type} - {leave.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewStatus;
