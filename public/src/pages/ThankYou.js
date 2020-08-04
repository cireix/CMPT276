import React from "react";
import Layout from "../Layout";
import { withRouter } from "react-router-dom";

const ThankYou = (props) => {
  return (
    <Layout>
      <div class='jumbotron text-center'>
        <div class='fa-4x'>
          <i class='fas fa-check' style={{ color: "#2ECC71" }}></i>
        </div>
        <h1 className='display-3 mb-3'>Thank you</h1>
        <p className='lead mb-3'>
          <strong>Your request have been sent correctly.</strong>
        </p>
        <p className='mb-3'>Thank you for using our application!</p>
      </div>
    </Layout>
  );
};

export default withRouter(ThankYou);
