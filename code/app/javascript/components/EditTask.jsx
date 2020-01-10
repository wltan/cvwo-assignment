import React from "react";
import { Link } from "react-router-dom";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      title: "",
      description: "",
      duedate: "",
      tags: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      .then(() => this.setState({ title: this.state.task.title }))
      .then(() => this.setState({ description: this.state.task.description }))
      .then(() => this.setState({ duedate: this.state.task.due_date }))
      .then(() => this.setState({ tags: this.state.task.tags }))
      .catch(() => this.props.history.push("/tasks"));
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { title, description, duedate, tags } = this.state;

    if (title.length == 0){
      alert("Title cannot be empty!");
      return;
    }

    const due_date = new Date(duedate);

    const body = {
      title,
      description,
      due_date,
      tags
    };

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
    const { task } = this.state;
    return (
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-12 col-lg-6 offset-lg-3">
            <h1 class="font-weight-normal mb-5">
              Edit Task
            </h1>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label htmlFor="taskName">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div class="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  class="form-control"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>
              <div class="form-group">
                <label htmlFor="duedate">Due Date</label>
                <input
                  type="date"
                  name="duedate"
                  id="duedate"
                  class="form-control"
                  onChange={this.onChange}
                  value={this.state.duedate}
                />
              </div>
              <div class="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  class="form-control"
                  onChange={this.onChange}
                  value={this.state.tags}
                />
              </div>
              <button type="submit" class="btn custom-button mt-3">
                Save Changes
              </button>
              <Link to="/tasks" class="btn btn-link mt-3">
                Back to tasks
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default EditTask;
