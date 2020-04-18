import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  //Link,
  Paper,
  Grid,
  Divider,
  Typography,
  Button,
  Card,
  Chip,
} from '@material-ui/core';

export default function FeedbackListItem(props) {
  const header = false || props.header;
  const {
    data: { contact, comment, createdAt },
  } = props;

  const date = new Date(createdAt);

  const preventDefault = (event) => event.preventDefault();
  return (
    <>
      <Card
        //variant="outlined"
        elevation={0}
        square
        style={{ padding: 10, marginBottom: 10 }}
      >
        <Grid spacing={2} container>
          <Grid item xs={3}>
            <Typography
              variant={header === true ? 'subtitle2' : 'body2'}
              color="primary"
              style={{ textDecoration: 'none' }}
            >
              {contact}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant={header === true ? 'subtitle2' : 'body2'}
              color="primary"
              style={{ textDecoration: 'none' }}
            >
              {comment}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant={header === true ? 'subtitle2' : 'body2'}
              color="primary"
              style={{ textDecoration: 'none' }}
            >
              {header === true ? createdAt : date.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
