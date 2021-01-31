import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Home from "./pages/home";
import TodoList from "./pages/TodoList";
import Test from "./pages/test";
import AnimatedPage from "./pages/AnimatedPage";
import FactSheet from "./pages/FactSheet";

export default function App() {
    return (
        <Router>
            <Link to="/home" >HOME</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/todoList" >TodoList</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/test" >Test</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/animate" >react-spring</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/factsheet" >fact-sheet</Link>
            <hr />
            <Switch>
                <Route path='/' exact render={() => (
                    <Redirect to={"/home"} />
                )} />
                {/* <Route path="/" component={Home} exact /> */}
                <Route path="/home" component={Home} exact />
                <Route path="/todoList" component={TodoList} exact />
                <Route path="/test" component={Test} exact />
                <Route path="/animate" component={AnimatedPage} exact />
                <Route path="/factsheet" component={FactSheet} exact />
            </Switch>
        </Router>
    )
}