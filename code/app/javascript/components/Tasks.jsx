import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      searchtags: "",
      searchdue: "",
      sortby: "1",
      showcompleted: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if(event.target.type === 'checkbox') {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
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
    const { tasks, searchtags, searchdue, sortby, showcompleted, reverse } = this.state;
    const MS_IN_DAY = 86400000; // milliseconds in a day
    const tz_offset = new Date().getTimezoneOffset() * -60000;

    const percentLeft = task =>
      Math.round(100 * (timeLeft(task))
      / (new Date(task.due_date).getTime() + MS_IN_DAY - new Date(task.created_at).getTime()));
    
    const timeLeft = task => new Date(task.due_date).getTime() - new Date().getTime() + MS_IN_DAY;
    const days_left = task => (timeLeft(task)) / MS_IN_DAY;
    
    function highlightRow(task) {
      if(task.completed){
        return "bg-success";
      }
      if(days_left(task) < 0) {
        // overdue
        return "bg-danger";
      }
      if(days_left(task) < 1) {
        // due today
        return "bg-warning";
      }
      const threshold = Number(searchdue);
      if(threshold && ((new Date(task.due_date).getTime() - new Date().getTime()) / MS_IN_DAY) < threshold){
        return "bg-warning";
      } else {
        return "";
      }
    }
    
    function additionalInfo(task) {
      return {
        "1": Math.floor(days_left(task)) + " day(s) left",
        "2": Math.floor(days_left(task)) + " day(s) left",
        "3": "Created on " + new Date(new Date(task.created_at).getTime() + tz_offset).toISOString().split("T")[0],
        "4": percentLeft(task) + "% time left"
      }[sortby];
    }

    function filterfn(task) {
      // Condition: hide completed items if the checkbox is not selected
      if(task.completed && !showcompleted) {
        return false;
      }
      // Condition: all query tag items must be a substring of any one of the task tags
      const query_tag_list = searchtags.split(" ");
      // Task tags are defined as both title words and additional tags
      const task_tag_list = task.title + " " + task.tags;
      let ans = true;
      for(let i = 0; i < query_tag_list.length; i++)
        ans = ans && task_tag_list.match(query_tag_list[i]);
      return ans;
    }

    const sortfns = {
      "1": (a, b) => (reverse ^ (a.due_date > b.due_date)) ? 1 : -1,
      "2": (a, b) => (reverse ^ (a.title.toLowerCase() > b.title.toLowerCase())) ? 1 : -1,
      "3": (a, b) => (reverse ^ (a.created_at > b.created_at)) ? 1 : -1,
      "4": (a, b) => (reverse ^ (percentLeft(a) > percentLeft(b)) ? 1 : -1)
    };

    const filteredTasks = tasks.filter(filterfn).sort(sortfns[sortby]);
    const mappedTasks = filteredTasks.map((task, index) => (
      <tr key={index} className={highlightRow(task)}>
        <td>{task.title}</td>
        <td>{task.due_date} ({additionalInfo(task)})</td>
        <td>{task.tags}</td>
        <td>
          <Link to={`/task/complete/${task.id}`}><span className="fa fa-check"></span></Link>
          <Link to={`/task/${task.id}`}><span className="fa fa-eye"></span></Link>
          <Link to={`/task/edit/${task.id}`}><span className="fa fa-pencil"></span></Link>
          <Link to={`/task/delete/${task.id}`}><span className="fa fa-trash"></span></Link>
        </td>
      </tr>
    ));

    const noTask = (
      <tr>
        <td colSpan="4">
            No tasks yet.
        </td>
      </tr>
    );

    const filters = (
      <div className="bg-light">
        <div className="p-3">
          <h4>Filters</h4>
          <form>
            <div className="form-group">
              <label htmlFor="showcompleted">Show Completed Tasks: &nbsp;</label>
              <input
                type="checkbox"
                id="showcompleted"
                name="showcompleted" 
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              Search title/tags: &nbsp;
              <input
                type="text"
                id="searchtags"
                name="searchtags" 
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              Highlight tasks due in &nbsp;
              <input
                type="number"
                id="searchdue"
                name="searchdue"
                onChange={this.onChange}
              />
              &nbsp; days.
            </div>
            <div className="form-group">
              Sort by: &nbsp;
              <select id="sortby" name="sortby" onChange={this.onChange}>
              <option value="1">Due Date</option>
              <option value="2">Title</option>
              <option value="3">Created Date</option>
              <option value="4">% Time Left</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="reverse">Reverse Order: &nbsp;</label>
              <input
                type="checkbox"
                id="reverse"
                name="reverse" 
                onChange={this.onChange}
              />
            </div>
          </form>
        </div>
      </div>
    );

    return (
      <div>
        <div className="text-center pt-5">
          <h1>Main Task List</h1>
        </div>
        <div className="py-5">
          <main className="container">
            { filters }
            <div className="text-center my-3">
              <Link to="/task" className="btn btn-primary">
                Create New Task
              </Link>
            </div>
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
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
      </div>
    );
  }

}
export default Tasks;
