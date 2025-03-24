import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes", {
        headers: {
          Authorization: auth?.token,
        },
      });
      const data = await response.json();
      if(data.success == false){
        navigate("/")
      }
      setNotes(data.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
      if (auth?.token) {
        fetchNotes();
      }
  }, [auth]);


//----update
  const handleUpdate = async (id, updatedTitle, updatedContent) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify({
          title: updatedTitle,
          content: updatedContent,
        }),
      });
  
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id
              ? { ...note, title: updatedTitle, content: updatedContent }
              : note
          )
        );
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: auth?.token,
        }
      });
      console.log(`Note - ${id} deleted`);
      setNotes((prevNotes) =>
        prevNotes.filter((noteItem) => noteItem._id !== id)
      );
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  return (
    <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] min-h-screen">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="flex flex-wrap items-start">
        {notes.map((noteItem) => (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
