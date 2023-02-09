import { Button } from "@mui/material";
import Head from "next/head";

import { HomePageLayout } from "layouts";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePageLayout />
        <Button variant="outlined">Click</Button>
      </main>

      <footer>footer</footer>
    </div>
  );
};

export default Home;
