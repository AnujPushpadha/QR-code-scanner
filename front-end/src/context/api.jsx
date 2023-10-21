// api.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:8080/contents";
import { Link, useNavigate } from "react-router-dom";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  //   const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/contents")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/contents/${id}`)
      .then(() => {
        console.log(`Deleted row with id: ${id}`);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  const handleScanAndPost = async (result, formattedDate) => {
    try {
      const response = await axios.post(url, { result, formattedDate });
      console.log("Post success:", response.data);
      fetchData();
      // Handle the response as needed
    } catch (error) {
      console.error("Post error:", error);
      // Handle errors here
    }
  };

  const handleRegister = async (userData) => {
    console.log(userData);
    const { username, email, password } = userData;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        { username, email, password }
      );
      //   console.log(response.data);
    } catch (err) {
      console.log("Post error:", err);
    }
  };

  const handleLogin = async (userData) => {
    // console.log(userData);

    const { email, password } = userData;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password }
      );
      console.log(response.data.accessToken);

      localStorage.setItem("token", response.data.accessToken);

      navigate("/"); // Navigate to the home route after successful login
    } catch (err) {
      // console.log("Post error:", err.response.data.message);
      //   throw new Error(err.response.data.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        handleDelete,
        handleScanAndPost,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
