import React from "react";
import { Link } from "react-router-dom";

class CompleteTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    };
  }

  componentDidMount() {
    const { task } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const completed = true;
    const body = { completed };

    const url = `/api/v1/update/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    
    
    return (
      <div class="container mt-5">
        <h3>Redirecting...</h3>
      </div>
    );
  }

}

export default CompleteTask;
