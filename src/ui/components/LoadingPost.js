import React from 'react';
import Header from './Header';
import { Grid, Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

function EmptySection(props) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      style={{ padding: 10, marginTop: 10 }}
    >
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item xs={11}>
          <Typography variant="h6" color="secondary">
            {props.label}
          </Typography>
        </Grid>
      </Grid>

      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Paper>
  );
}

export default function LoadingPost() {
  return (
    <Header search={false}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Grid>
      </Grid>
      <EmptySection label="Use Case" />
      <EmptySection label="Solution" />
      <EmptySection label="Additional Resources" />
    </Header>
  );
}
