import React, {Component, useState} from 'react';
import './Login.css'
import reactFamilyFinanceApi from "../../services/api";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="login-page gradient-custom">
        <div>
          <div className="card-login">
            <h4 className="text-center">Login</h4>
            <input
              type="text"
              onChange={async (e) => {
                await this.setState({...this.state, login: e.target.value})
              }}
              id="input-login"
              className="input-login check-login form-control"
              required={true}
              value={this.state.login}
              placeholder="Login"
              onKeyDown={async (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  event.stopPropagation();
                  // await this.checkLogin()
                }
              }}
            />
            <input
              type="text"
              onChange={async (e) => {
                await this.setState({...this.state, password: e.target.value})
              }}
              id="input-password"
              className="input-login check-login form-control"
              value={this.state.password}
              placeholder="Password"
              required={true}
              onKeyDown={async (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  event.stopPropagation();
                  // await this.checkLogin()
                }
              }}
            />
            <button
              className="btn btn-block btn-primary check-login"
              onClick={async (e) => {
                // await this.checkLogin(this.state.login, this.state.password)
                await reactFamilyFinanceApi.login({"login": this.state.login, "password": this.state.password})
                window.location.reload()
              }}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    )
  }

}