import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: { ingredients: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.backToList = this.backToList.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
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
    this.props.history.push(`/task/delete/${id}`);
  }

  backToList() {
    this.props.history.push(`/tasks`);
  }

  editTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.history.push(`/task/edit/${id}`);
  }

  completeTask() {

  }

  render() {
    const { task } = this.state;

    return (
      <div class="">
        <div class="container">
          <div class="text-center pt-5">
            <h1>View Task Details</h1>
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
          <div class="container-fluid">
            <button type="button" class="btn btn-secondary mr-1" onClick={this.backToList}>
              <span class="fa fa-chevron-circle-left"></span>
              Back to Task List
            </button>
            <button type="button" class="btn btn-success mr-1" onClick={this.completeTask}>
              <span class="fa fa-check"></span>
              Complete Task
            </button>
            <button type="button" class="btn btn-dark mr-1" onClick={this.editTask}>
              <span class="fa fa-pencil"></span>
              Edit Task
            </button>
            <button type="button" class="btn btn-danger mr-1" onClick={this.deleteTask}>
              <span class="fa fa-trash"></span>
              Delete Task
            </button>
            
          </div>
        </div>
      </div>
    );
  }

}

export default Task;
