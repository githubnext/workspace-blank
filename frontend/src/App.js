import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Search from './components/Search';
import Notification from './components/Notification';
import UserActivityFeed from './components/UserActivityFeed';
import Gamification from './components/Gamification';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/post/:id" component={BlogPost} />
          <Route path="/create" component={CreatePost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/search" component={Search} />
          <Route path="/notifications" component={Notification} />
          <Route path="/activity" component={UserActivityFeed} />
          <Route path="/gamification" component={Gamification} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
