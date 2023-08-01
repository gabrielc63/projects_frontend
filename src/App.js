import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./redux/boardsSlice";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Center from "./components/Center";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/boards");

        if (!response.ok) {
          // Handle errors if the response is not successful
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch(setData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header />
      {/* <Center /> */}
    </div>
  );
};

export default App;
