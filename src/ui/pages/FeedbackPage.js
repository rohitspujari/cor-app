import React, { useEffect, useState } from 'react';
import ResultList from '../components/ResultList';
import Header from '../components/Header';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post, Feedback } from '../../models';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import FeedbackListItem from '../components/FeedbackListItem';
import { Divider } from '@material-ui/core';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const results = await DataStore.query(Feedback, Predicates.ALL, {
        page: 0,
        limit: 100,
      });
      setFeedbacks(results);
    } catch {}
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <Header>
      <FeedbackListItem
        header={true}
        data={{
          contact: 'Contact',
          comment: 'Feedback',
          createdAt: 'Date',
        }}
      />
      <Divider />
      {feedbacks.length > 0
        ? feedbacks.map((data, i) => <FeedbackListItem data={data} key={i} />)
        : null}
    </Header>
  );
}
