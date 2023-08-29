import React, { useState } from "react";
import { useSelector } from "react-redux";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards.boardItems);
  const board = boards.find((board) => board.isActive === true);
  const lists = board.lists;
  const list = lists.find((col, i) => i === colIndex);
  const task = list.tasks.find((task, i) => i === taskIndex);

  let subtasks = task.subtasks;
  let completed = 0;

  return (
    <div>
      <div
        onClick=""
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
    </div>
  );
}

export default Task;
