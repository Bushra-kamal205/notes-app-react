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
  <div className="flex min-h-screen bg-white text-black">
  {/* Sidebar - Fixed Left */}
  <aside className="fixed top-0 left-0 h-screen w-40 md:w-64 bg-[#D27D2D] p-4 border-r border-white overflow-y-auto">
    <h2 className="text-lg md:text-xl font-bold mb-4 text-white">📚 Saved Notes</h2>
    <ul className="space-y-3">
      {notes.map((n) => (
        <li
          key={n._id}
          className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-[#CD7F32] border-2 hover:bg-[#E1C16E] transition"
        >
          <h3 className="font-semibold text-[#092635] mb-2 text-sm md:text-base">
            {n.title}
          </h3>

          {/* Render HTML from Tiptap */}
          <div
            className="text-xs md:text-sm text-gray-600 line-clamp-3 mb-3"
            dangerouslySetInnerHTML={{ __html: n.note }}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => navigate(`/notes/${n._id}`)}
              className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-[#CD7F32] text-white rounded hover:bg-[#A0522D]"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(n._id)}
              className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-[#A0522D] text-white rounded hover:bg-[#CD7F32]"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </aside>

  {/* Main Form - Pushed Right */}
  <main className="flex-1 ml-40 md:ml-64 p-4 md:p-8">
    <h1 className="text-xl md:text-2xl font-extrabold mb-6 text-[#092635]">
      📝 Add a New Note
    </h1>
    <form
      onSubmit={submitHandler}
      className="space-y-4 bg-[#D27D2D] p-4 md:p-6 rounded-lg shadow-md border border-[#CD7F32] border-2"
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Enter Title..."
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="w-full p-2 md:p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#96A78D] focus:outline-none"
      />

      {/* Tiptap Toolbar */}
      {editor && (
        <div className="flex gap-2 bg-white p-2 rounded-lg border border-[#96A78D] mb-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 md:px-3 py-1 rounded font-bold ${
              editor.isActive("bold")
                ? "bg-[#A0522D] text-white"
                : "bg-[#CD7F32] text-white"
            }`}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 md:px-3 py-1 rounded italic ${
              editor.isActive("italic")
                ? "bg-[#A0522D] text-white"
                : "bg-[#CD7F32] text-white"
            }`}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 md:px-3 py-1 rounded underline ${
              editor.isActive("underline")
                ? "bg-[#A0522D] text-white"
                : "bg-[#CD7F32] text-white"
            }`}
          >
            U
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div className="bg-white text-black p-2 md:p-3 rounded-lg border border-[#D27D2D] min-h-[150px]">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="px-4 md:px-6 py-2 bg-[#A0522D] text-white rounded-lg font-bold border border-[#A0522D] hover:bg-white hover:text-[#A0522D] transition"
      >
        Save Note
      </button>
    </form>
  </main>
</div>



  );
}

export default Note;
