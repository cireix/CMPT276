import React from 'react';   
import Products from 'components/Products';
import Layout from 'Layout';

const App = (props) => {
    const user = global.auth.getUser();

    return(
        <Layout>
            <Products user = {user}/>
        </Layout>
    );

}

export default App;