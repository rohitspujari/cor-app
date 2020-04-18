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

export default function ResultList(props) {
  const {
    data: { id, service, feature, problem },
  } = props;

  const preventDefault = (event) => event.preventDefault();
  return (
    <>
      <Card
        //variant="outlined"
        elevation={0}
        square
        style={{ padding: 10, marginBottom: 10 }}
      >
        <Grid
          style={{ marginBottom: 0 }}
          container
          justify="flex-start"
          spacing={2}
        >
          <Grid item>
            <Chip label={service} variant="outlined" color="primary" />
            {/* <Typography>Billing & Accounting</Typography> */}
          </Grid>
          <Grid item>
            <Chip label={feature} variant="outlined" color="secondary" />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          component={Link}
          to={`/post/${id}`}
          color="primary"
          style={{ textDecoration: 'none' }}
        >
          {/* <Link href="#" c to={`/case/${id}`} onClick={preventDefault}> */}
          {problem}
          {/* </Link> */}
        </Typography>
        {/* <Typography>Views: 5</Typography> */}
      </Card>
    </>
  );
}
