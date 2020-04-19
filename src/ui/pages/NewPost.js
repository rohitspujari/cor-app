import React, { useState, useContext } from 'react';
import { Grid, Button, Box, TextField } from '@material-ui/core';
import Header from '../components/Header';
import Section from '../components/Section';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../../models';
import SERVICES from '../utils/aws_services';
import UserContext from '../UserContext';

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

export default function NewPost() {
  const user = useContext(UserContext);

  const [values, setValues] = useState(initialState);
  const history = useHistory();

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  //console.log(values);

  const { service, feature, problem, solution, resources } = values;

  const handleSaveExit = () => {
    handleSave();
    history.push('/');
  };

  const handleSave = async () => {
    await DataStore.save(
      new Post({
        service,
        feature,
        problem,
        solution,
        resources,
        user: user.username,
        searchField: `${service.toLowerCase()} ${feature.toLowerCase()} ${problem.toLowerCase()} ${solution.toLowerCase()} ${resources.toLowerCase()}`,
      })
    );
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
          style={{ marginRight: 10 }}
          variant="contained"
          color="primary"
        >
          Save & Create New
        </Button>
        <Button onClick={handleSaveExit} variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Header>
  );
}
