import React from 'react';
import Products from '../components/Products';
import Layout from '../Layout';
import Driver from "../components/Driver";
import { getUser } from '../globalFunc/auth';
import { withRouter } from 'react-router-dom';

const App = (props) => {
  const user = getUser();

  const checkAuth = () => {
    if (user.type === undefined) {
      props.history.push('/login');
    } else if (user.type !== 2) {
      return <Products user = {user}/>
    } else {
      return <Driver user = {user}/>
    }
  };

  return(
      <Layout>
          <div data-test="app-wrapper">
            { checkAuth() }
          </div>
      </Layout>
  );
}

export default withRouter(App);
