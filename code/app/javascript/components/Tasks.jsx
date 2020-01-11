import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      searchtags: "",
      searchdue: "",
      sortby: "1"
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
    const { tasks, searchtags, searchdue, sortby } = this.state;
    function filterfn(task) {
      // Condition: all query tag items must be present in at any of the task tags
      const query_tag_list = searchtags.split(" ");
      // Task tags are defined as both title words and additional tags
      const task_tag_list = task.title + " " + task.tags;
      let ans = true;
      for(let i = 0; i < query_tag_list.length; i++)
        ans = ans && task_tag_list.match(query_tag_list[i]);
      return ans;
    }
    const percentLeft = task => Math.round(
      100 * (new Date(task.due_date).getTime() - new Date().getTime())
      / (new Date(task.due_date).getTime() - new Date(task.created_at).getTime()));
    const sortfns = {
      "1": (a, b) => a.due_date < b.due_date,
      "2": (a, b) => a.title < b.title,
      "3": (a, b) => a.created_at < b.created_at,
      "4": (a, b) => percentLeft(a) < percentLeft(b)
    };
    const filteredTasks = tasks.filter(filterfn).sort(sortfns[sortby]);
    const mappedTasks = filteredTasks.map((task, index) => (
      <tr key={index} class="">
        <td>{task.title}</td>
        <td>{task.due_date} ({percentLeft(task)}%)</td>
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
              <input
                type="text"
                id="searchtags"
                name="searchtags" 
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              Highlight tasks due in &nbsp;
              <input
                type="number"
                id="searchdue"
                name="searchdue"
                onChange={this.onChange}
              />
              &nbsp; days.
            </div>
            <div class="form-group">
              Sort by: &nbsp;
              <select id="sortby" name="sortby" onChange={this.onChange}>
              <option value="1">Due Date</option>
              <option value="2">Title</option>
              <option value="3">Created Date</option>
              <option value="4">% Time Left</option>
              </select>
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
                    <th>Due Date (% Time Left)</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.length > 0 ? mappedTasks : noTask}
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
