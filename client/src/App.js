import React from 'react';
import Layout from './core/Layout';

const App = () => {
  return (
    <Layout>
      <div className='col-md-6 offset-md-3 text-center'>
        <h1 className='pt-5'>MERNSTACK </h1>
        <h2>BOILERPLATE</h2>
        <hr />
        <p className='lead'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          reprehenderit, reiciendis dolor perspiciatis, explicabo vitae
          necessitatibus obcaecati harum minus tenetur eaque sapiente dolorem.
          Atque hic velit quo necessitatibus officia dolores?
        </p>
      </div>
    </Layout>
  );
};

export default App;
