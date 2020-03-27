import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Create Your Fav Pizza</h1>
      <h2>Click here to order your pizza!</h2>
      <Link to={"/Pizza"}>
        <div>Order Here</div>
      </Link>
    </div>
  );
};

export default Home;
