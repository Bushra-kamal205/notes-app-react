import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Tiptap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function Note() {
  const [note, setNote] = useState({ title: "", note: "" });
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  // Fetch notes
  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      console.log("API response:", response.data);
      setNotes(response.data.note);
    } catch (err) {
    console.error("Error fetching notes:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Create note
  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/create`, note);
      setNote({ title: "", note: "" });
      editor.commands.clearContent(); 
      await fetchData();
      navigate("/note");
    } catch (err) {
      console.error("Error submitting note:", err);
    }
  }

  // Delete note
  async function deleteHandler(id) {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  // Tiptap editor setup
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: note.note,
    onUpdate: ({ editor }) => {
      setNote({ ...note, note: editor.getHTML() });
    },
  });

  return (
   <div className="flex min-h-screen bg-[#e666ff] text-white">
  {/* Sidebar */}
  <aside className="w-1/3 bg-[#571357] p-4 border-r border-[#880099]">
    <h2 className="text-xl font-bold mb-4 text-gray-200">📚 Saved Notes</h2>
    <ul className="space-y-3">
      {notes.map((n) => (
        <li
          key={n._id}
          className="bg-[#d57fff] p-4 rounded-lg shadow-sm border border-[#880099] flex justify-between items-start hover:bg-[#c400cc] transition"
        >
          <div>
            <h3 className="font-semibold text-white">{n.title}</h3>
            {/* Render HTML from Tiptap */}
            <div
              className="text-sm text-gray-200 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: n.note }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/notes/${n._id}`)}
              className="px-3 py-1 text-xs bg-[#880099] text-white rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(n._id)}
              className="px-3 py-1 text-xs bg-[#880099] text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </aside>

  {/* Main Form */}
  <main className="flex-1 p-8">
    <h1 className="text-2xl font-extrabold  mb-6 text-white">📝 Add a New Note</h1>
    <form
      onSubmit={submitHandler}
      className="space-y-4 bg-[#571357] p-6 rounded-lg shadow-md border border-[#880099]"
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Enter Title..."
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="w-full p-3 rounded-lg bg-[#d57fff] text-gray-700 placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
      />

      {/* Tiptap Toolbar */}
      {editor && (
        <div className="flex gap-2 bg-[#d57fff] p-2 rounded-lg border border-[#880099] mb-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded font-bold ${
              editor.isActive("bold")
                ? "bg-[#c400cc] text-white"
                : "bg-[#880099] text-white"
            }`}
          >
            B
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded italic ${
              editor.isActive("italic")
                ? "bg-[#c400cc] text-white"
                : "bg-[#880099] text-white"
            }`}
          >
            I
          </button>

          {/* Underline Button */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded underline ${
              editor.isActive("underline")
                ? "bg-[#c400cc] text-white"
                : "bg-[#880099] text-white"
            }`}
          >
            U
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div className="bg-[#d57fff] text-gray-700 p-3 rounded-lg border border-[#880099] min-h-[150px]">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#880099] text-white rounded-lg font-bold hover:bg-[#c400cc] transition"
      >
        Save Note
      </button>
    </form>
  </main>
</div>

  );
}

export default Note;
