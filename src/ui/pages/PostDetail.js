import React, { useEffect, useState } from 'react';

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
} from '@material-ui/core';

import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import { DataStore, Predicates } from '@aws-amplify/datastore';

import Header from '../components/Header';
import Section from '../components/Section';
import { Post } from '../../models';
import { useHistory } from 'react-router-dom';
import DeleteAlertDialog from '../components/DeleteAlertDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SERVICES from '../utils/aws_services';

export default function PostDetail(props) {
  const [originalPost, setOriginalPost] = useState(null);
  const [post, setPost] = useState(null);
  const [isEdited, setIsEdited] = React.useState(false);
  const history = useHistory();

  const {
    match: {
      params: { number },
    },
  } = props;

  const handleChange = (name) => (e) => {
    setPost({ ...post, [name]: e.target.value });
  };

  const getPost = async () => {
    const post = await DataStore.query(Post, (c) => c.id('eq', number));
    setOriginalPost(post[0]);
    setPost(post[0]);
  };

  useEffect(() => {
    getPost();
  }, [number]);

  if (!post) return null;
  const { service, feature, problem, solution, resources } = post;

  //console.log(post);

  return (
    <Header search={false}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          {/* <Paper elevation={0} style={{ padding: 0 }}> */}
          {isEdited === true ? (
            <Autocomplete
              onChange={(event, newValue) => {
                setPost({
                  ...post,
                  service: newValue === null ? null : newValue.title,
                });
              }}
              options={SERVICES}
              //value={service}
              defaultValue={SERVICES.filter((s) => s.title === service)[0]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="AWS Service" variant="outlined" />
              )}
            />
          ) : (
            <Paper elevation={0} style={{ padding: 10 }}>
              <Typography>{`Service: ${service}`}</Typography>
            </Paper>
          )}
          {/* </Paper> */}
        </Grid>
        <Grid item sm={6} xs={12}>
          {isEdited === true ? (
            <TextField
              onChange={handleChange('feature')}
              fullWidth
              value={feature}
              id="outlined-basic"
              label="Feature/Capability"
              variant="outlined"
            />
          ) : (
            <Paper elevation={0} style={{ padding: 10 }}>
              <Typography>{`Feature: ${feature}`}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Section
        onChange={handleChange('problem')}
        editable={isEdited}
        label={'Use Case'}
        source={problem}
      />

      <Section
        onChange={handleChange('solution')}
        editable={isEdited}
        label={'Solution'}
        source={solution}
      />
      <Section
        onChange={handleChange('resources')}
        editable={isEdited}
        label={'Additional Resources'}
        source={resources}
      />
      <Grid container style={{ marginTop: 2 }}>
        <Grid item>
          <IconButton>
            <ThumbsUpIcon></ThumbsUpIcon>
          </IconButton>
        </Grid>
        <IconButton>
          <ThumbsDownIcon></ThumbsDownIcon>
        </IconButton>
      </Grid>
      <Box style={{ float: 'right', marginBottom: 10 }}>
        {isEdited === false ? (
          <DeleteAlertDialog
            onConfirmDelete={async () => {
              await DataStore.delete(post);
              history.push('/');
            }}
          />
        ) : null}
        <Button
          style={{ marginLeft: 10 }}
          onClick={async () => {
            if (isEdited === true) {
              // edit state
              //console.log(originalPost, post);
              await DataStore.save(
                Post.copyOf(originalPost, (updated) => {
                  //console.log(originalPost);
                  updated.service = service;
                  updated.feature = feature;
                  updated.problem = problem;
                  updated.solution = solution;
                  updated.resources = resources;
                })
              );
            }
            setIsEdited(!isEdited);
          }}
          variant="outlined"
          color="primary"
        >
          {isEdited === true ? 'Save' : 'Edit'}
        </Button>
      </Box>
    </Header>
  );
}
