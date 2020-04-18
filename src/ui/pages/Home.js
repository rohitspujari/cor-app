import React, { useEffect, useState } from 'react';
import ResultList from '../components/ResultList';
import Header from '../components/Header';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post } from '../../models';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

export default function Home() {
  const [searchText, setSearchText] = useState(null);
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

  const searchPosts = async () => {
    const query = `query SearchPosts {
      searchPosts(filter: {
        service: { wildcard: "*${searchText}*" }
        
      }) {
        items {
          id
          service
          feature
          problem
          solution
          resources
        }
      }
    }`;

    //const posts = await API.graphql(graphqlOperation(query));

    const posts = await DataStore.query(Post, (c) =>
      c.or((c) =>
        c
          .service('contains', searchText)
          .feature('contains', searchText)
          .problem('contains', searchText)
          .solution('contains', searchText)
          .resources('contains', searchText)
      )
    );
    //console.log(posts);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   searchPosts();
  // }, [searchText]);

  //console.log(posts);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Header
      search={true}
      onSearchTextChange={handleChange}
      onSearchSubmit={searchPosts}
      createButton={true}
    >
      {/* <SearchBar /> */}
      {posts.length > 0
        ? posts.map((data, i) => <ResultList data={data} key={i} />)
        : null}
    </Header>
  );
}
