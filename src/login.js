import React from 'react'
import logo from './images/logo.png'
import { callApi, errorResponse, setSession } from './main';
import './forgotpassword';

const popupwindowstyle = { width: '300px', height: '550px', background: 'white' };
const logostyle = { width: '90px', height: '90px', position: 'absolute', left: '100px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };


function Login(){
    window.onload = function(){
        var login = document.getElementById('login');
        login.style.display="block";
    }

    function validate()
    {
        var T3=document.getElementById('T3');
        var T2=document.getElementById('T2');

        var url = "http://localhost:5000/login/signin";
        var data = JSON.stringify({
            empid : T3.value,
            pwd : T2.value
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res)
    {
        var data = JSON.parse(res);
        if(data === 1)
        {
            var T3=document.getElementById('T3');
            setSession("sid", T3.value, (24 * 60));
            window.location.replace("/home");
        }
        else
            alert("Invalid Credentials!");
    }

    function registration(){
        var T3 = document.getElementById('T3');
        var T2 = document.getElementById('T2');
        T3.value="";
        T2.value="";
        
        var reg = document.getElementById('registration');
        var login = document.getElementById('login');
        login.style.display = "none";
        reg.style.display = "block";
    }

    function register(){
        var RT1 = document.getElementById('RT1');
        var RT2 = document.getElementById('RT2');
        var RT3 = document.getElementById('RT3');
        var RT4 = document.getElementById('RT4');
        var RT5 = document.getElementById('RT5');
        var RT6 = document.getElementById('RT6');
        var RT7 = document.getElementById('RT7');
        RT1.style.border="";
        RT2.style.border="";
        RT3.style.border="";
        RT4.style.border="";
        RT5.style.border="";
        RT6.style.border="";
        RT7.style.border="";
        if(RT1.value==="")
        {
            RT1.style.border = "1px solid red";
            RT1.focus();
            return;
        }
        if(RT2.value==="")
        {
            RT2.style.border = "1px solid red";
            RT2.focus();
            return;
        }
        if (RT3.value >= 2200030000 && RT3.value <= 2200035000) {
            // Valid range, no alert needed
        } else {
            alert("Please enter a valid employee id");
            RT3.style.border = "1px solid red";
            RT3.focus();
            return;
        }
        if(RT4.value==="")
        {
            RT4.style.border = "1px solid red";
            RT4.focus();
            return;
        }
        if(RT5.value==="")
        {
            RT5.style.border = "1px solid red";
            RT5.focus();
            return;
        }
        if(RT6.value==="")
        {
            RT6.style.border = "1px solid red";
            RT6.focus();
            return;
        }
        if(RT6.value!==RT7.value)
        {
            alert("Password and Re-type Password must be same");
            RT5.style.border="1px solid red";
            RT5.focus();
            return;
        }

        var url = "http://localhost:5000/registration/signup";
        var data = JSON.stringify({
            firstname : RT1.value,
            lastname : RT2.value,
            empid:RT3.value,
            contactno : RT4.value,
            emailid : RT5.value,
            pwd : RT6.value,
            imgurl:""
        });
        callApi("POST", url,  data, registeredSuccess, errorResponse);
        //alert("Registered successfullty...");

        RT1.value="";
        RT2.value="";
        RT3.value="";
        RT4.value="";
        RT5.value="";
        RT6.value="";
        RT7.value="";

        var login = document.getElementById('login');
        var registration = document.getElementById('registration');
        registration.style.display = 'none';
        login.style.display = 'block';
    }

    function registeredSuccess(res)
    {
        var data = JSON.parse(res);
        alert(data);
    }
    return(
        <div className='full-height'>
            <div id='header' className='loginheader'>Quantum Tech</div>
            <div id='content' className='logincontent'>
                <div id='login' className='popup'>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle} >
                        <div className='loginstyle1'>Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>EmployeeID*</div>
                            <div><input type='text' id='T3' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='T2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={validate}>Sign In</button></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>New user? <label className='linklabel' onClick={registration}>Register here</label></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>Forgot Password? <a className='linklabel' href="/forgotpassword">Click here</a></div>
                            <div style={space}></div>
                            <div style={space}></div>

                        </div>
                    </div>
                </div>
                <div id='registration' className='popup'>
                    <div id='registrationwindow' className='popupwindow'  style={popupwindowstyle}>
                        <div className='loginstyle1'>New Registration</div>
                        <div className='loginstyle2'>
                            <div>First Name*</div>
                            <div><input type='text' id='RT1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div><input type='text' id='RT2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>EmployeeID*</div>
                            <div><input type='text' id='RT3' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div><input type='text' id='RT4' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div><input type='text' id='RT5' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='RT6' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Re-type Password*</div>
                            <div><input type='password' id='RT7' className='txtbox' /></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={register}>Register</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'>Copyright @ Quantum Tech. All rights reserved.</div>
        </div>
    );
}

export default Login;