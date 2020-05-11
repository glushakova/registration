import React, { Component } from 'react';
import * as firebase from 'firebase';
import TextInput from '../TextInput';
import Loader from '../Loader';
import './style.css';

class SignIn extends Component {
  state = {
    email: '',
    pincode: '',
    loading: false,
    userUid: null,
    error: '',
  };

  clickButton = (event) => {
    if (
      this.state.email.length > 6 &&
      this.state.pincode.length >= 6 &&
      !this.state.loading &&
      !this.state.userUid
    ) {
      this.signIn();
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.userUid) {
      this.onClearUid();
    }
  };

  onClearUid = () => {
    this.setState({
      userUid: null,
    });
  };

  signIn = () => {
    // запрос еще не начался
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pincode)
      .then((response) => {
        if (response.user.uid) {
          // запрос пришел и он успешный
          this.setState({
            loading: false,
            userUid: response.user.uid,
          });
        }
      })
      .catch((error) => {
        // запрос пришел и он с ошибкой
        this.setState({
          loading: false,
          error: error.message,
          email: '',
          pincode: '',
        });
      });
    // запрос уже начался
    this.setState({ loading: true, error: '' });
  };

  onPincodeChange = (event) => {
    this.setState({ pincode: event.target.value });
  };

  renderLoader = () => {
    if (this.state.loading) {
      return <Loader />;
    }
  };

  onClearClick = () => {
    this.setState({
      email: '',
      pincode: '',
      error: '',
      userUid: null,
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h3 className="text">Log in</h3>
        <TextInput
          type="text"
          label="email"
          valueFromProps={this.state.email}
          onChangeFromProps={(event) => {
            this.setState({ email: event.target.value });
          }}
        />
        <TextInput
          type="password"
          label="pincode"
          valueFromProps={this.state.pincode}
          onChangeFromProps={(event) => this.onPincodeChange(event)}
        />
        <button onClick={(event) => this.clickButton(event)}>
          {this.state.userUid && !this.state.error ? 'Success' : 'Log in'}
        </button>
        <button onClick={this.onClearClick}>Clear</button>
        {this.state.error ? (
          <h3 className="h3">{this.state.error}</h3>
        ) : (
          <h3 className="h3">{this.state.userUid}</h3>
        )}
        {this.renderLoader()}
      </div>
    );
  }
}

export default SignIn;
