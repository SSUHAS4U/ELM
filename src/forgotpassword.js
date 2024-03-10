import React, { Component } from 'react';
import './forgotpassword.css'; // Import CSS file

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
  
    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error sending password reset request:', error);
      this.setState({ message: 'Error sending password reset request' });
    }
  }

  render() {
    return (
      <div className="forgot-password-container"> 
        <h2>Forgot Password</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group"> 
            <label>Email:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
        {this.state.message && <p className="message">{this.state.message}</p>} {/* Apply CSS class to the message */}
      </div>
    );
  }
}

export default ForgotPassword;
