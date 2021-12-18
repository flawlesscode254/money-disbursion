import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RequestLoan from './RequestLoan';
import Progress from './Progress';
import RepayMent from './Repayment';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={RequestLoan} />
          <Route path="/request" component={RequestLoan} />
          <Route path="/pay" component={Emergency} />
          <Route path="/progress" component={Progress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;