import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "./redux/boardsSlice";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Center from "./components/Center";

const App = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  // const boards = useSelector((state) => state.boards);
  const status = useSelector((state) => state.boards.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getBoards());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />
      {/* <Center /> */}
    </div>
  );
};

export default App;
