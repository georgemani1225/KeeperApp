import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/notes")
        const data = await response.json();
        setNotes(data.data); 
      } catch (error) {
        console.log("Error:", error.message);
      }
    }
    fetchNotes();
  },[])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`,{
        method: "DELETE",
      });
      console.log(`Note - ${id} deleted`)
      setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem._id !== id));
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
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={handleDelete}
        />
      );
    })}
    <Footer />

  </div>
    
  );
}

export default Home;
