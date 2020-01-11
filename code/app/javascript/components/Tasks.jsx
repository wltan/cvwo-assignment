import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }
  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <tr key={index} class="">
        <td>{task.title}</td>
        <td>{task.due_date}</td>
        <td>{task.tags}</td>
        <td>
          <Link to={`/task/complete/${task.id}`}><span class="fa fa-check"></span></Link>
          <Link to={`/task/${task.id}`}><span class="fa fa-eye"></span></Link>
          <Link to={`/task/edit/${task.id}`}><span class="fa fa-pencil"></span></Link>
          <Link to={`/task/delete/${task.id}`}><span class="fa fa-trash"></span></Link>
        </td>
      </tr>
    ));
    const noTask = (
      <tr>
        <td colspan="4">
            No tasks yet.
        </td>
      </tr>
    );
    const filters = (
      <div class="bg-light">
        <div class="p-3">
          <h5>Filters</h5>
          <form>
            <div class="form-group">
              Search title/tags: &nbsp;
              <input type="text"></input>
            </div>
            <div class="form-group">
              Highlight tasks due in &nbsp;
              <input type="number"></input>
              &nbsp; days.
            </div>
            <div class="form-group">
              Sort by: &nbsp;
              <input type="dropdown"></input>
            </div>
          </form>
        </div>
      </div>
    );

    return (
      <>
        <section class="jumbotron jumbotron-fluid text-center">
          <div class="container py-5">
            <h3>Main Task List</h3>
            <p class="lead text-muted">
              placeholder text
            </p>
          </div>
        </section>
        <div class="py-5">
          <main class="container">
            { filters }
            <div class="text-center my-3">
              <Link to="/task" class="btn btn-primary">
                Create New Task
              </Link>
            </div>
            <div class="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? allTasks : noTask}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </>
    );
  }

}
export default Tasks;
