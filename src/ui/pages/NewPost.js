import React, { useState, useContext } from 'react';
import { Grid, Button, Box, TextField, Snackbar } from '@material-ui/core';
import Header from '../components/Header';
import Section from '../components/Section';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../../models';
import SERVICES from '../utils/aws_services';
import UserContext from '../UserContext';
import MuiAlert from '@material-ui/lab/Alert';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

const initialState = {
  service: 'EC2',
  feature: 'Reserved Instances',

  problem:
    'For example, need way to consolidate billing for multiple AWS Accounts, allowing for one bill, easy tracking, combined usage, and shared discounts',

  solution:
    'This is how you can solve this problem. You may also want to consider following options.\n * Option 1\n * Option 2\n * Option 3 \n\nSee the code snippet below.\n\n```const aws = "awesome!" //this is my code```\n #### Check out the tutorial in resources',
  resources:
    'To learn more, see the [markdown](https://rexxars.github.io/react-markdown/) tutorial.',
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewPost() {
  const user = useContext(UserContext);
  const [values, setValues] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const { service, feature, problem, solution, resources } = values;

  const handleSaveExit = () => {
    handleSave();
    history.push('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    const input = {
      service: service || ' ',
      feature: feature || ' ',
      problem: problem || ' ',
      solution: solution || ' ',
      resources: resources || ' ',
      user: user.username,
      searchField: `${service.toLowerCase()} ${feature.toLowerCase()} ${problem.toLowerCase()} ${solution.toLowerCase()} ${resources.toLowerCase()} ${
        user.username
      }`,
    };

    try {
      await API.graphql(graphqlOperation(mutations.createPost, { input }));
      setShowSuccess(true);
      //setIsSaving(false);
    } catch (e) {
      console.log(e);
      setError(e);
      //alert(JSON.stringify(e));
    } finally {
      setIsSaving(false);
    }

    // await DataStore.save(
    //   new Post({
    //     service,
    //     feature,
    //     problem,
    //     solution,
    //     resources,
    //     user: user.username,
    //     searchField: `${service.toLowerCase()} ${feature.toLowerCase()} ${problem.toLowerCase()} ${solution.toLowerCase()} ${resources.toLowerCase()}`,
    //   })
    // );
  };

  const handleClose = (event, reason) => {
    //console.log('closing');
    // if (reason === 'clickaway') {
    //   return;
    // }

    setError(null);
    setShowSuccess(false);
  };

  return (
    <Header search={false}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          {/* <Paper elevation={0} style={{ padding: 0 }}> */}
          <Autocomplete
            onChange={(event, newValue) => {
              setValues({
                ...values,
                service: newValue === null ? null : newValue.title,
              });
            }}
            id="combo-box-demo"
            options={SERVICES}
            defaultValue={SERVICES[0]}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="AWS Service" variant="outlined" />
            )}
          />
          {/* </Paper> */}
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            onChange={handleChange('feature')}
            fullWidth
            value={feature}
            id="outlined-basic"
            label="Feature/Capability"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Section
        editable={true}
        onChange={handleChange('problem')}
        label={'Use Case'}
        source={problem}
      />
      <Section
        onChange={handleChange('solution')}
        editable={true}
        label={'Solution'}
        source={solution}
      />
      <Section
        onChange={handleChange('resources')}
        editable={true}
        label={'Resources'}
        source={resources}
      />
      <Box style={{ float: 'right', marginTop: 10, marginBottom: 10 }}>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          style={{ marginRight: 10 }}
          variant="contained"
          color="primary"
        >
          Save & Create New
        </Button>
        <Button
          disabled={isSaving}
          onClick={handleSaveExit}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Box>
      <Snackbar
        open={error ? true : false}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          There was an error
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          New use case created
        </Alert>
      </Snackbar>
    </Header>
  );
}
