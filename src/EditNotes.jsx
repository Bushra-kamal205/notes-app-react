import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function EditNotes() {
  const [note, setNote] = useState({ title: "", note: "" });
  const params = useParams();
  const navigate = useNavigate();
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  // Setup Tiptap
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    onUpdate: ({ editor }) => {
      setNote((prev) => ({ ...prev, note: editor.getHTML() }));
    },
  });

  // Fetch single note
  useEffect(() => {
    async function fetchSingleNote() {
      try {
        const response = await axios.get(`${BASE_URL}/notes/${params.id}`);
        setNote(response.data.note);
        if (editor) {
          editor.commands.setContent(response.data.note.note); // load into editor
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSingleNote();
  }, [params.id, editor]);

  // Handle title input
  function changeHandler(e) {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  }

  // Submit updated note
  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/notes/${params.id}`, note);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">✏️ Edit Note</h1>

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
            onChange={changeHandler}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Toolbar */}
          {editor && (
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded ${
                  editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                }`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded italic ${
                  editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                }`}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`px-3 py-1 rounded underline ${
                  editor.isActive("underline") ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                }`}
              >
                U
              </button>
            </div>
          )}

          {/* Tiptap Editor */}
          <div className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white min-h-[200px]">
            <EditorContent editor={editor} />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Note
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditNotes;
