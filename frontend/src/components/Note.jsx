import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-60 m-4 float-left">
      <h1 className="text-lg mb-1">{props.title}</h1>
      <p className="text-base mb-2 whitespace-pre-wrap break-words">
        {props.content}
      </p>
      <button
        onClick={handleClick}
        className="relative float-right text-[#f5ba13] w-9 h-9 border-none cursor-pointer bg-none"
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
