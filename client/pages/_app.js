import App from "next/app";
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { UserContext } from "../contexts/UserContext";
import { PostsContext } from "../contexts/PostsContext";
import axios from "axios";

function MyApp({ Component, pageProps, userCookie, initialPosts }) {
  const [user, setUser] = useState(userCookie);
  const [posts, setPosts] = useState(initialPosts);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <PostsContext.Provider value={[posts, setPosts]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
}

//custom App function that enables fetching of the user cookie before the page is rendered :)
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const userCookie = appContext.ctx.req?.cookies?.user
    ? JSON.parse(appContext.ctx.req.cookies.user)
    : null;

  const response = await axios
    .get("https://quiet-wildwood-05743.herokuapp.com/posts/get")
    .then((response) => response.data.reverse())
    .catch((error) => console.log(error));

  const initialPosts = response ? response : [];

  return { ...appProps, userCookie, initialPosts };
};

export default MyApp;
