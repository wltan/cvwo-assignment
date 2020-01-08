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
    const paddedIcon = {
      paddingRight: "10px"
    };
    const allTasks = tasks.map((task, index) => (
      <tr key={index} class="">
        <td>{task.title}</td>
        <td>{task.due_date}</td>
        <td>{task.tags}</td>
        <td>
          <a><span style={paddedIcon} class="fa fa-check"></span></a>
          <a><span style={paddedIcon} class="fa fa-eye"></span></a>
          <a><span style={paddedIcon} class="fa fa-pencil"></span></a>
          <a><span style={paddedIcon} class="fa fa-trash"></span></a>
        </td>
      </tr>

      
      // <div key={index} class="col-md-6 col-lg-4">
      //   <div class="card mb-4">
      //     <div class="card-body">
      //       <h5 class="card-title">{task.title}</h5>
      //       <Link to={`/task/${task.id}`} class="btn custom-button">
      //         View Task
      //       </Link>
      //     </div>
      //   </div>
      // </div>


    ));
    const noTask = (
      <tr>
        <td colspan="4">
            No tasks yet.
        </td>
      </tr>
    );

    return (
      <>
        <section class="jumbotron jumbotron-fluid text-center">
          <div class="container py-5">
            <h1 class="display-4">placeholder heading</h1>
            <p class="lead text-muted">
              placeholder text
            </p>
          </div>
        </section>
        <div class="py-5">
          <main class="container">
            <div class="text-right mb-3">
              <Link to="/task" class="btn custom-button">
                Create New Task
              </Link>
            </div>
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {tasks.length > 0 ? allTasks : noTask}
              </table>
            </div>
            <Link to="/" class="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}
export default Tasks;
