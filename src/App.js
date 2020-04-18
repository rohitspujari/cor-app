import React from 'react';
//import logo from "./logo.svg";
import './App.css';

import ResultList from './ui/components/ResultList';
import Header from './ui/components/Header';
import { Route, Switch } from 'react-router-dom';

import Post from './ui/pages/PostDetail';
import NewPost from './ui/pages/NewPost';
import Home from './ui/pages/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/post/:number" component={Post} />
      <Route path="/create/" component={NewPost} />
    </Switch>
  );
}

export default App;
