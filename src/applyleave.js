import {errorResponse, getSession,  } from './main';
import './applyleave.css';
import Axios from 'axios';
import React, { useState } from 'react';


export function profileInfo()
{
    var url = "http://localhost:5000/applyleave/leave";
    // var data = JSON.stringify({
    //     emailid : getSession("sid")
    // });
    // callApi("POST", url, data, loadInfo, errorResponse);
    Axios.post(url, {empid : getSession("sid")})
        .then(res => loadInfo(res))
        .catch(err => errorResponse(err));

}
export function loadInfo(res)
{
    var data = res.data;
    //var data = JSON.parse(res);
    var L1 = document.getElementById('L1');
    var L2 = document.getElementById('L2');
    var L3 = document.getElementById('L3');
    var L4 = document.getElementById('L4');
    var L5 = document.getElementById('L5');
    L1.innerHTML = `<b style='color:red'>${data[0].firstname}</b>`;
    L2.innerText = data[0].lastname;
    L3.innerText = data[0].contactno;
    L4.innerText = data[0].emailid;
    L5.innerText = data[0].leaves;
}

const LeaveManagement = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableLeaves, setAvailableLeaves] = useState(0);

  const calculateAvailableLeaves = () => {
      const totalLeaves = 20;
      const usedLeaves = 5;
      const remainingLeaves = totalLeaves - usedLeaves;
      setAvailableLeaves(remainingLeaves);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      calculateAvailableLeaves();
  };

  return (
      <div className="leave-management-container">
          <h2 className="leave-management-heading">Leave Management</h2>
          <form className="leave-form" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="leaveType">Leave Type:</label>
                  <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                      <option value="">Select Leave Type</option>
                      <option value="sick">Sick Leave</option>
                      <option value="vacation">Vacation Leave</option>
                      <option value="annual">Annual Leave</option>
                      <option value="bereavement">Bereavement Leave</option>
                      <option value="personal">Personal Leave</option>
                      <option value="jury">Jury Duty Leave</option>                 
                      </select>
              </div>
              <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <button type="submit" className="btn-submit">Apply Leave</button>
          </form>
          <div className="available-leaves">Available Leaves: {availableLeaves}</div>
      </div>
  );
};

export default LeaveManagement;
