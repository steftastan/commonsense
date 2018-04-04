import $ from 'jquery';
import './../global.config.env.js';
import './../global.config.pages.js';
import React, { Component } from 'react';

export class Login extends Component {

    constructor(props) {
      super(props);
      this.componentList = [];
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isLogin = false;
      this.activeSession = false;
      this.companies = {};
      this.language = '';
      this.employeeName = '';
      this.defaultCompany = '';
      this.accordion = {};
      this.routesToComponents = [];
      this.routes = {};
      this.companyDropDown = 'companyList';
      this.state = {
          routes: null,
          loaded: false,
          accordion: null,
          language: '',
          companies: [],
          employeeName: '',
          defaultCompany: '',
          logoPath: '',
          isLogin: false,
          activeSession: false,
          username: '',
          password: '',
          content: (<div className="spinner"></div>)
      }
    }

    handleSubmit(e) {
        if (e) e.preventDefault();

        $.ajax({
    		url: global.endpoints[global.env].AUTH,
    		method: 'POST',
    		cache: false,
    		data: JSON.stringify({username: this.state.username, password: this.state.password}),
    		success: function(data, status) {
                window.location.href = global.paths[global.env].REACT_LINK+global.paths[global.env].DASHBOARD;
    		},
    		error: function(xhr, status, err) {
    			console.error(xhr, status, err.toString());
    		}
       });
    }

    render() {
        return (
            <div className="wrapper wrapper__app App">
                <div className="container-fluid wrapper__content--login">
                    <h2 className="login__title">Login to continue</h2>
                    <form>
                        <input name="username" className="login__input" type="text" placeholder="Username"
                            onChange={(event) => this.setState({username: event.target.value})}/>
                        <input name="password" className="login__input" type="password" placeholder="Password"
                            onChange={(event) => this.setState({password: event.target.value})}/>
                        <input name="submit" className="login__submit" onClick={this.handleSubmit} type="submit" value="Log in"/>
                        <span className="login__rememberMe">
                            <input className="login__remember--checkbox" type="checkbox" defaultChecked data-toggle="toggle"/>
                            <span className="login__remember--text">Remember me</span>
                        </span>
                        <a className="login__pwChange" href="/change-password">Change password</a>
                        </form>
                </div>
            </div>
        );
    }
};

export default Login;
