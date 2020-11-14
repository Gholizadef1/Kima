import React, { Component } from "react";
import axios from "axios";
class UsersList extends Component {
  state = {
    title: "",
    body: ""
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onBodyChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      body: this.state.body
    };
    axios.post("https://jsonplaceholder.typicode.com/posts", data)      .then(res => console.log(res))      .catch(err => console.log(err));  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Title" value={this.state.title}
            onChange={this.onTitleChange} required
          />
          
          
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }
}

export default UsersList;