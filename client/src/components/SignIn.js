import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../requests/user';

class SignIn extends Component {
  state = {
    email: 'semak.alexander@gmail.com',
    password: ''
  };

  onEmailChange = e => this.setState({ email: e.target.value });

  onPasswordChange = e => this.setState({ password: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const {
      state: { email, password }
    } = this;

    signIn({ email, password });
  };

  render() {
    const {
      onEmailChange,
      onPasswordChange,
      onSubmit,
      state: { email, password }
    } = this;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form action="dashboard.html" onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
