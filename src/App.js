import React from 'react';
//import logo from "./logo.svg";
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';

import { Route, Switch } from 'react-router-dom';

import Post from './ui/pages/PostDetail';
import NewPost from './ui/pages/NewPost';
import Home from './ui/pages/Home';
import theme from './ui/Theme';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

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
