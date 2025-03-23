import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, ScaleFade } from "@chakra-ui/react";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form
        className="relative w-[480px] bg-white mx-auto my-8 p-4 rounded-lg shadow-md"
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            maxLength="20"
            className="w-full border-none p-1 text-lg outline-none resize-none"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 2 : 1}
          maxLength="100"
          className="w-full border-none p-1 text-lg outline-none resize-none"
        />
        <ScaleFade in={isExpanded} initialScale={0.9}>
          <IconButton
            onClick={handleSubmit}
            aria-label="Add Note"
            icon={<AddIcon />}
            className="relative float-right bottom-2 bg-[#f5ba13] text-white w-9 h-9 shadow-md hover:bg-yellow-500"
          />
        </ScaleFade>
      </form>
    </div>
  );
}

export default CreateArea;