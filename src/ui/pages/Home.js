import React, { useEffect, useState } from 'react';
import ResultListItem from '../components/ResultListItem';
import Header from '../components/Header';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post } from '../../models';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card } from '@material-ui/core';

export default function Home() {
  const [searchText, setSearchText] = useState(null);
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    try {
      // const posts = await DataStore.query(Post, Predicates.ALL, {
      //   page: 0,
      //   limit: 100,
      // });
      const {
        data: {
          listPosts: { items },
        },
      } = await API.graphql(
        graphqlOperation(queries.listPosts, { limit: 300 })
      );
      //console.log(items);

      setPosts(items);
    } catch {}
  };

  const searchPosts = async () => {
    const query = `query SearchPosts {
      searchPosts(filter: {
        searchField: { wildcard: "*${searchText.trim().toLowerCase()}*" }       
      }, limit: 200) {
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

    try {
      const {
        data: {
          searchPosts: { items },
        },
      } = await API.graphql(graphqlOperation(query));

      // console.log(items, searchText);

      setPosts(items);
    } catch (e) {
      console.log(e);
    }

    // const posts = await DataStore.query(Post, (c) =>
    //   c.or((c) =>
    //     c
    //       .service('contains', searchText)
    //       .feature('contains', searchText)
    //       .problem('contains', searchText)
    //       .solution('contains', searchText)
    //       .resources('contains', searchText)
    //       .searchField('contains', searchText)
    //   )
    // );
    //console.log(posts);
    //setPosts(posts);
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

  function LoadingSkeleton() {
    return (
      <>
        {[...new Array(5)].map((_, idx) => (
          <Card
            key={idx}
            variant="outlined"
            elevation={0}
            //square
            style={{ padding: 10, marginBottom: 10 }}
          >
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Card>
        ))}
      </>
    );
  }

  //if (posts === null) return <LoadingSkeleton />;

  return (
    <Header
      search={true}
      onSearchTextChange={handleChange}
      onSearchSubmit={searchPosts}
      createButton={true}
    >
      {posts === null ? (
        <LoadingSkeleton />
      ) : posts.length > 0 ? (
        posts.map((data, i) => <ResultListItem data={data} key={i} />)
      ) : null}
    </Header>
  );
}
