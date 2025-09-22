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
    content: note.note,
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
      navigate("/note");
    } catch (err) {
      console.error(err);
    }
  }

  return (
   <div className="flex min-h-screen bg-[#e666ff] text-white">
  <main className="flex-1 p-8">
    <h1 className="text-2xl font-extrabold mb-6 text-white">✏️ Edit Note</h1>

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
        onChange={changeHandler}
        className="w-full p-3 rounded-lg bg-[#d57fff] text-white placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
      />

      {/* Toolbar */}
      {editor && (
        <div className="flex gap-2 mb-2">
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

      {/* Tiptap Editor */}
      <div className="w-full p-3 rounded-lg bg-[#d57fff] text-white border border-[#880099] min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#880099] text-white rounded-lg font-bold hover:bg-[#4b0726] transition"
      >
        Update Note
      </button>
    </form>
  </main>
</div>

  );
}

export default EditNotes;
