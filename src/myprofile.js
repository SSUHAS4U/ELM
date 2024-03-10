import React from 'react';
import { errorResponse, getSession, callApiFileUpload } from './main';
import './myprofile.css';
import Axios from 'axios';

export function profileInfo() {
    var url = "http://localhost:5000/myprofile/info";
    Axios.post(url, { empid: getSession("sid") })
        .then(res => loadInfo(res))
        .catch(err => errorResponse(err));
}

export function loadInfo(res) {
    var data = res.data;
    var L1 = document.getElementById('L1');
    var L2 = document.getElementById('L2');
    var L3 = document.getElementById('L3');
    var L4 = document.getElementById('L4');
    var L5 = document.getElementById('L5');
    L1.innerHTML = `<b style='color:blue'>${data[0].firstname}</b>`;
    L2.innerText = data[0].lastname;
    L3.innerText = data[0].contactno;
    L4.innerText = data[0].emailid;
    L5.innerText = data[0].leaves;
}

export function uploadPhoto() {
    var FU = document.getElementById('FU');
    var url = "http://localhost:5000/uploaddp";
    var data = new FormData();
    data.append("fname", getSession("sid"));
    data.append("myfile", FU.files[0]);
    callApiFileUpload("POST", url, data, uploadSuccess, errorResponse);
}

export function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

class MyProfile extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        if (this.sid === "")
            window.location.replace("/");

        profileInfo();
    }

    render() {
        return (
            <div className='fullheight'>
                <h3>User Profile</h3>
                <table className='tablestyle'>
                    <tr>
                        <td className='firstcolumn'>First Name</td>
                        <td><label id='L1'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Last Name</td>
                        <td><label id='L2'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Contact No.</td>
                        <td><label id='L3'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Email Id</td>
                        <td><label id='L4'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Available Leaves</td>
                        <td><label id='L5'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Upload Photo</td>
                        <td><input type='file' id='FU' accept='image/jpeg' onChange={uploadPhoto} /></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Applied Leaves</td>
                        <td>
                            <ul>
                                <li>Vacation: 5 times</li>
                                <li>Sick Leave: 3 times</li>
                                <li>Personal Leave: 2 times</li>
                                <li>Maternity Leave: 1 time</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default MyProfile;
