import React, { useEffect, useState, useContext } from 'react';

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Chip,
  Button,
  IconButton,
} from '@material-ui/core';

import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import { DataStore } from '@aws-amplify/datastore';

import Header from '../components/Header';
import Section from '../components/Section';
import { Post } from '../../models';
import { useHistory } from 'react-router-dom';
import DeleteAlertDialog from '../components/DeleteAlertDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import SERVICES from '../utils/aws_services';
import UserContext from '../UserContext';

export default function PostDetail(props) {
  const user = useContext(UserContext);
  const [originalPost, setOriginalPost] = useState(null);
  const [post, setPost] = useState(null);
  const [isEdited, setIsEdited] = React.useState(false);
  const [canEdit, setCanEdit] = useState(false);
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
    try {
      const {
        data: { getPost },
      } = await API.graphql(graphqlOperation(queries.getPost, { id: number }));
      //console.log(getPost);
      setOriginalPost(getPost);
      setPost(getPost);
    } catch {}

    //const post = await DataStore.query(Post, (c) => c.id('eq', number));
    //setOriginalPost(post[0]);
    //setPost(post[0]);
  };

  useEffect(() => {
    if (user && post) setCanEdit(post.user === user.username);
  }, [post, user]);

  useEffect(() => {
    getPost();
  }, []);

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
            // <Chip
            //   //size="small"
            //   label={service}
            //   variant="default"
            //   color="primary"
            // />
            <Paper elevation={0} variant="outlined" style={{ padding: 10 }}>
              <Typography>{`${service}`}</Typography>
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
            // <Chip
            //   //size="small"
            //   label={feature}
            //   variant="default"
            //   color="default"
            // />
            <Paper elevation={0} variant="outlined" style={{ padding: 10 }}>
              <Typography>{`${feature}`}</Typography>
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
      {canEdit === true ? (
        <Box style={{ float: 'right', marginBottom: 10 }}>
          {isEdited === false ? (
            <DeleteAlertDialog
              onConfirmDelete={async () => {
                await API.graphql(
                  graphqlOperation(mutations.deletePost, {
                    input: { id: post.id },
                  })
                );
                //await DataStore.delete(post);
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

                const input = {
                  id: post.id,
                  service,
                  feature,
                  problem,
                  solution,
                  resources,
                  searchField: `${service.toLowerCase()} ${feature.toLowerCase()} ${problem.toLowerCase()} ${solution.toLowerCase()} ${resources.toLowerCase()}`,
                };

                await API.graphql(
                  graphqlOperation(mutations.updatePost, { input })
                );

                // await DataStore.save(
                //   Post.copyOf(originalPost, (updated) => {
                //     //console.log(originalPost);
                //     updated.service = service;
                //     updated.feature = feature;
                //     updated.problem = problem;
                //     updated.solution = solution;
                //     updated.resources = resources;
                //     updated.searchField = `${service.toLowerCase()} ${feature.toLowerCase()} ${problem.toLowerCase()} ${solution.toLowerCase()} ${resources.toLowerCase()}`;
                //   })
                // );
              }
              setIsEdited(!isEdited);
            }}
            variant="contained"
            color="primary"
          >
            {isEdited === true ? 'Save' : 'Edit'}
          </Button>
        </Box>
      ) : null}
    </Header>
  );
}
