import React, { Component } from "react";
import "./calculator.js";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if (data.data === 'token expired') {
          alert("Token Expired Login Again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }

  logout = async (id) => {
    try {
      fetch("http://localhost:5000/logout", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        });

    } catch (error) {
      console.log(error);
    }
  };

  logOut = () => {
    const { id } = "1";
    console.log(id);
    fetch("http://localhost:5000/logout", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((data) => {
        console.log(data, "userData");
        window.localStorage.clear();
        window.location.href = "./sign-in";
      });

  }

  render() {
    return (
      <div>
        <div class="card">
          <div class="card-header">
            Kalkulator
          </div>
          <div class="card-body">
            <h5 class="card-title">Login as {this.state.userData.email}</h5>
            <div class="calculator">
              <div class="input" id="input"></div>
              <div class="input2" id="input2"></div>
              <div class="buttons">
                <div class="operators">
                  <div>+</div>
                  <div>-</div>
                  <div>&times;</div>
                  <div>&divide;</div>
                </div>
                <div class="leftPanel">
                  <div class="numbers">
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                  </div>
                  <div class="numbers">
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                  </div>
                  <div class="numbers">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                  <div class="numbers">
                    <div>0</div>
                    <div>.</div>
                    <div id="clear">C</div>
                  </div>
                </div>
                <div class="equal" id="result">=</div>
              </div>
            </div>
            <button onClick={() => this.logout(this.state.userData._id)} className="btn btn-primary">Logout</button>
          </div>
        </div>
      </div>

    );
  }
}
