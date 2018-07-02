import React, { Component } from 'react';
import { connect } from 'react-redux';

import notifications from '../utilities/notifications';
import { signUp } from '../redux/actions/account';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { 
      props: {
        dispatch
      },
      state:{
        name, 
        email, 
        password, 
        passwordConfirm
      }
    } = this;

    const values = [
      name,
      email,
      password,
      passwordConfirm
    ];
    
    const trimmedValues = values.map(v => v.trim());

    if(trimmedValues.some(v => !v)) {
      return notifications.error('All fields are required');
    }

    const [
      trimmedName,
      trimmedEmail, 
      trimmedPassword, 
      trimmedpasswordConfirm
    ] = trimmedValues;

    if(trimmedPassword !== trimmedpasswordConfirm) {
      return notifications.error('Password should match with confirm password');
    }

    if(trimmedPassword.length < 6) {
      return notifications.error('Password should be more than 5 symbols');
    }

    dispatch(signUp({
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      passwordConfirm: trimmedpasswordConfirm
    }));
  };


  onNameChange = e => this.setState({ name: e.target.value });
  onEmailChange = e => this.setState({ email: e.target.value });
  onPasswordChange = e => this.setState({ password: e.target.value });
  onPasswordConfirmChange = e => this.setState({ passwordConfirm: e.target.value });

  render() {
    const {
      onSubmit,
      onNameChange,
      onEmailChange,
      onPasswordChange,
      onPasswordConfirmChange,
      state: {
        name,
        email,
        password,
        passwordConfirm
      }
    } = this;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onNameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onEmailChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                  </small>
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
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={onPasswordConfirmChange}
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

export default connect()(SignUp);
