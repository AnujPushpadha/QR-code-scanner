import React, { useEffect, useState } from "react";
import Scan from "../components/Scan";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
// import { DataProvider } from "../context/api";
const Home = () => {
  return (
    <>
      {/* <DataProvider> */}
      <Navbar></Navbar>
      <Scan></Scan>
      <Table />
      {/* </DataProvider> */}
    </>
  );
};

export default Home;
