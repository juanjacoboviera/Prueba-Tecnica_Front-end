import React, { useState, useEffect } from "react";
import SearchUser from "./SearchUser";
import UserTable from "./UserTable";
import UserChart from "./UserChart";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Home = () => {
  const userInfo = useSelector((state) => state.users);

  return (
    <>
      <main>
        <SearchUser />
        <UserTable usersList={userInfo.usersList} />
        <UserChart usersList={userInfo.usersList} />
      </main>
    </>
  );
};

export default Home;
