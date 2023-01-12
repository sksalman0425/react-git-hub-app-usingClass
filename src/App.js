import React from "react"; //this is required when we write class component
import "./App.css"; //for importing App.css file feature
import axios from "axios";
//To install axios lib in package, first stop the App (by ctrl+C) 
//then run the command "npm install --save axios" and then npm start
// function App() {
//   return (
//     <div>
//     <div className="header">
//       The Git Hub App
//     </div>
//     </div>
//   );
// }

// const testData = [
//   { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
//   { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
//   { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
// ];
const CardList = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => {
        return <Card profile={profile} />
      })}
    </div>
  )
}
class Form extends React.Component {
  state = {
    userName: "",
  }
  handleInputChange = (event) => {
    this.setState({ userName: event.target.value });
  }
  handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("state", this.state.userName);
    const config = {
      method: "get",
      url: `https://api.github.com/users/${this.state.userName}`,
      headers: {},
    };
    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      this.props.onDataRecievedFromAPI(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type={"text"}
            placeholder="Enter the github username"
            value={this.state.userName}
            onChange={this.handleInputChange}
            required
          />
          <button> Add Profile Card</button>
        </form>
      </div>
    )
  }
}
// const Form =(props)=>{
//   return(
//     <div>
//       <form action="">
//         <input type={"text"} placeholder="Enter github username"/>
//         <button>add Profile Card</button>
//       </form>
//     </div>
//   )
// }
//we can write class component as below
//which has render method is compulsary and in which we write return method.
// In function component we only have return method i.e. not render method.
class Card extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div style={{ margin: "1rem" }}>
        <img src={profile.avatar_url} style={{ width: "75px" }} />
        <div style={{ display: "inline-block", marginLeft: "12px" }}>
          <div style={{ fontSize: "125%" }}>{profile.name}</div>
          <div>{profile.company}</div>
        </div>
      </div>
    )
  }
}
//Below is Another class
class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    console.log("profile ::", profileData);
    this.setState({ profiles: [...this.state.profiles, profileData] });
  };
  render() {
    return (
      <div>
        <div className="header">
          The Git Hub App
        </div>
        <Form onDataRecievedFromAPI={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}
//profiles and profile are two different state i.e. variable.
export default App;
