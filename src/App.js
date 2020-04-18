import React from 'react';
//import logo from "./logo.svg";
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';

import ResultList from './ui/components/ResultList';
import Header from './ui/components/Header';
import { Route, Switch } from 'react-router-dom';

import Post from './ui/pages/PostDetail';
import NewPost from './ui/pages/NewPost';
import Home from './ui/pages/Home';
import theme from './ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post/:number" component={Post} />
        <Route path="/create/" component={NewPost} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
