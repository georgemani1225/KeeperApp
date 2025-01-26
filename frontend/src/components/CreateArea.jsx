import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    noteTitle: "",
    noteContent: "",
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
      const response = await fetch("http://localhost:8080/todo/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
      });
      props.onAdd(note);
      setNote({
        noteTitle: "",
        noteContent: "",
      });
    } catch (error) {
      console.log("Error: ", error.message);
    }

  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="noteTitle"
            onChange={handleChange}
            value={note.noteTitle}
            placeholder="Title"
            maxLength="20"
          />
        )}

        <textarea
          name="noteContent"
          onClick={expand}
          onChange={handleChange}
          value={note.noteContent}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          maxLength="100"
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
