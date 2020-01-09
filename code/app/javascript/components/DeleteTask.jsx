import React from "react";
import { Link } from "react-router-dom";

class DeleteTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: { ingredients: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { task } = this.state;

    return (
      <div class="">
        <div class="container py-5">
          <div class="col-sm-12 col-lg-7">
            <div class="row">
              <h5 class="col-4">Title</h5>
              <div class="col-8"
                dangerouslySetInnerHTML={{
                  __html: `${this.addHtmlEntities(task.title)}`
                }}
              />
            </div>
            <div class="row">
              <h5 class="col-4">Description</h5>
              <div class="col-8"
                dangerouslySetInnerHTML={{
                  __html: `${this.addHtmlEntities(task.description)}`
                }}
              />
            </div>
            <div class="row">
              <h5 class="col-4">Due Date</h5>
              <div class="col-8"
                dangerouslySetInnerHTML={{
                  __html: `${this.addHtmlEntities(task.due_date)}`
                }}
              />
            </div>
            <div class="row">
              <h5 class="col-4">Tags</h5>
              <div class="col-8"
                dangerouslySetInnerHTML={{
                  __html: `${this.addHtmlEntities(task.tags)}`
                }}
              />
            </div>

          </div>
          <div class="col-sm-12 col-lg-5">
            <button type="button" class="btn btn-danger" onClick={this.deleteTask}>
              Delete Task
            </button>
          </div>
          <Link to="/tasks" class="btn btn-link">
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }

}

export default DeleteTask;
