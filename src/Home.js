import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Create Your Favorite Pizza</h1>
      <Link to={"/Pizza"}>
        <div>Place Order</div>
      </Link>
    </div>
  );
};

export default Home;
