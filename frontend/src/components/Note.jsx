import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NoteModal from "./NoteModal";

function Note(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 w-60 m-4 float-left" onClick={openModal}>
        <h1 className="text-[16px] font-medium mb-1">{props.title}</h1>
        <p className="text-[14px] mb-2 whitespace-pre-wrap break-words">
          {props.content}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="relative float-right text-[#f5ba13] w-9 h-9 border-none cursor-pointer bg-none"
        >
          <DeleteIcon />
        </button>
      </div>

      {isModalOpen && (
        <NoteModal
          id={props.id}
          title={props.title}
          content={props.content}
          onClose={closeModal}
          onUpdate={props.onUpdate}
        />
      )
      }
    </>
  );

}

export default Note;
