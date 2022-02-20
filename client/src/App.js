import "./App.css";
import "antd/dist/antd.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import CoachDashboard from "./Pages/CoachDashboard";
import Dashboard from "./Pages/CoachDashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
