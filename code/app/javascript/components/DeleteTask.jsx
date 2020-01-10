import React from "react";
import { Link } from "react-router-dom";

class DeleteTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: { ingredients: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.backToTask = this.backToTask.bind(this);
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

  backToTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.history.push(`/task/${id}`);
  }

  render() {
    const { task } = this.state;

    return (
      <div class="">
        <div class="container">
          <div class="text-center py-5">
            <h1>Confirm Delete Task</h1>
          </div>
          <div class="alert alert-danger">
            Are you sure you want to delete this task?
          </div>
          <div class="container py-5">
            <div class="row">
              <strong class="col-2">Title</strong>
              <div class="col-10">
                {task.title}
              </div>
            </div>
            <div class="row">
              <strong class="col-2">Description</strong>
              <div class="col-10">
                {task.description}
              </div>
            </div>
            <div class="row">
              <strong class="col-2">Due Date</strong>
              <div class="col-10">
                {task.due_date}
              </div>
            </div>
            <div class="row">
              <strong class="col-2">Tags</strong>
              <div class="col-10">
                {task.tags}
              </div>
            </div>

          </div>
          <div class="col-sm-12 col-lg-5">
            <button type="button" class="btn btn-secondary mr-1" onClick={this.backToTask}>
              <span class="fa fa-chevron-circle-left"></span>
              Back to Task Details
            </button>
            <button type="button" class="btn btn-danger" onClick={this.deleteTask}>
              <span class="fa fa-trash"></span>
              Delete Task
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default DeleteTask;
