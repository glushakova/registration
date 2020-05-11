import React, { Component } from 'react';
import * as firebase from 'firebase';
import TextInput from '../TextInput';
import Loader from '../Loader';
import './style.css';

class SingUp extends Component {
  state = {
    email: '',
    pincode: '',
    loading: false,
    userUid: null,
    error: '',
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

  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pincode)
      .then((response) => {
        if (response.user.uid) {
          this.setState({
            loading: false,
            userUid: response.user.uid,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
    this.setState({ loading: true, error: '' });
  };

  clickButton = (event) => {
    if (
      event.type &&
      this.state.email.length > 6 &&
      this.state.pincode.length >= 6 &&
      !this.state.loading
    ) {
      this.signUp();
    }
  };

  onPincodeChange = (event) => {
    this.setState({ pincode: event.target.value });
  };

  onChangeFromProps = (event) => {
    this.setState({ email: event.target.value });
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
    });
  };

  render() {
    return (
      <div className="sign-up">
        <h3 className="text">Sing up</h3>
        <TextInput
          type="text"
          label="email"
          valueFromProps={this.state.email}
          onChangeFromProps={(event) => this.onChangeFromProps(event)}
        />
        <TextInput
          type="password"
          label="pincode"
          valueFromProps={this.state.pincode}
          onChangeFromProps={(event) => this.onPincodeChange(event)}
        />
        <button onClick={(event) => this.clickButton(event)}>
          {this.state.userUid && !this.state.error ? 'Success' : 'Sing up'}
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

export default SingUp;
