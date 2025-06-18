import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const BASE_URL = "https://mern-backend-pfxv.onrender.com";

  const fetchNotes = async () => {
    const res = await axios.get(`${BASE_URL}/notes`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${BASE_URL}/notes/${editId}`, { title, content });
    } else {
      await axios.post(`${BASE_URL}/notes`, { title, content });
    }
    setTitle("");
    setContent("");
    setEditId(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Note Taking App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
      </form>

      <h3>Notes</h3>
      {notes.map((note) => (
        <div key={note._id} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => handleEdit(note)}>Edit</button>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
