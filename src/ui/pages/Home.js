import React, { useEffect, useState } from 'react';
import ResultList from '../components/ResultList';
import Header from '../components/Header';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post } from '../../models';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const posts = await DataStore.query(Post, Predicates.ALL, {
        page: 0,
        limit: 100,
      });
      setPosts(posts);
    } catch {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  //console.log(posts);

  return (
    <Header search={true} createButton={true}>
      {posts.length > 0
        ? posts.map((data, i) => <ResultList data={data} key={i} />)
        : null}
    </Header>
  );
}
