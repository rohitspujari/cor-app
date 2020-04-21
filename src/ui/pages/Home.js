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
