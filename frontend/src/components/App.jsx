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
        const response = await fetch("http://keeper-app-env.eba-phwzb2pt.ap-south-1.elasticbeanstalk.com/notes")
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
      const response = await fetch(`http://keeper-app-env.eba-phwzb2pt.ap-south-1.elasticbeanstalk.com/notes/${id}`,{
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

export default App;
