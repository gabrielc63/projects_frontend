import React, { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBoardAsync } from "../redux/boardsSlice";

function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [newLists, setNewLists] = useState([
    { name: "Todo", id: uuidv4() },
    { name: "Doing", id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);

  const onChange = (id, newValue) => {
    setNewLists((prevState) => {
      const newState = [...prevState];
      const list = newState.find((col) => col.id === id);
      list.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewLists((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      const newBoard = {
        name: name,
        lists_attributes: newLists,
      };
      dispatch(addBoardAsync(newBoard));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newLists }));
    }
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newLists.length; i++) {
      if (!newLists[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  return (
    <div
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder="e.g New app project"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>

          {newLists.map((list, index) => (
            <div key={index} className="flex items-center w-full ">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                onChange={(e) => {
                  onChange(list.id, e.target.value);
                }}
                type="text"
                value={list.name}
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(list.id);
                }}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={() => {
                setNewLists((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
