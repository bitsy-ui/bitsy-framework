import React from 'react';
import { BitsyUIComponent } from '@bitsy-ui/embed';

const Home = ({ microUI }) => {
  return (
    <div>
      This is a test page
      <BitsyUIComponent
        html={microUI}
        bitsyUi={{
          library: 'travellersCommonUI',
          name: 'ExampleComponent',
          url: 'http://localhost:8000',
        }}
      />
    </div>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:8000/ExampleComponent?htmlOnly=true');
  const posts = await res.text();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      microUI: posts,
    },
  };
}

export default Home;
