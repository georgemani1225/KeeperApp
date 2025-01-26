import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8080/todo/notes")
        const data = await response.json();
        setNotes(data); 
      } catch (error) {
        console.log("Error:", error.message);
      }
    }
    fetchNotes();
  },[])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/delete/${id}`,{
        method: "DELETE",
      });
      console.log(`Employee with ID ${id} deleted successfully`)
      setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== id));
    } catch (error) {
      console.log("Error" + error.message);
    }
  }

 function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.noteTitle}
            content={noteItem.noteContent}
            onDelete={handleDelete}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
