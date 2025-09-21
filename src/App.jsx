import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Tiptap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function App() {
  const [note, setNote] = useState({ title: "", note: "" });
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  // Fetch notes
  async function fetchData() {
    try {
      console.log("Backend URL:", BASE_URL);
      const {data} = await axios.get(`${BASE_URL}/notes`);
      if (data.statusText !== "OK") throw new Error("Data not fetched");
      setNotes(data.data.note);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Create note
  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}`, note);
      setNote({ title: "", note: "" });
      fetchData();
      navigate("/");
    } catch (err) {
      console.error(err);
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
    // title: note.note,
    onUpdate: ({ editor }) => {
      setNote({ ...note, note: editor.getHTML() });
    },
  });

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-900 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-200">📚 Saved Notes</h2>
        <ul className="space-y-3">
          {notes.map((n) => (
            <li
              key={n._id}
              className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 flex justify-between items-start hover:bg-gray-700 transition"
            >
              <div>
                <h3 className="font-semibold text-white">{n.title}</h3>
                {/* Render HTML from Tiptap */}
                <div
                  className="text-sm text-gray-400 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: n.note }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/notes/${n._id}`)}
                  className="px-3 py-1 text-xs bg-yellow-500 text-black rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(n._id)}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
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
        <h1 className="text-2xl font-bold mb-6 text-blue-400">📝 Add a New Note</h1>
        <form
          onSubmit={submitHandler}
          className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter Title..."
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Tiptap Toolbar */}
          {editor && (
            <div className="flex gap-2 bg-gray-800 p-2 rounded-lg border border-gray-600 mb-2">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded font-bold ${
                  editor.isActive("bold")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                B
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded italic ${
                  editor.isActive("italic")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                U
              </button>
            </div>
          )}

          {/* Editor Content */}
          <div className="bg-gray-800 text-white p-3 rounded-lg border border-gray-600 min-h-[150px]">
            <EditorContent editor={editor} />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Note
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
