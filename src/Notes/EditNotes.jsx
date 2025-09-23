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
   <div className="flex min-h-screen bg-white text-black">
  <main className="flex-1 p-8">
    <h1 className="text-2xl font-extrabold mb-6 text-black">✏️ Edit Note</h1>

    <form
      onSubmit={submitHandler}
      className="space-y-4 bg-[#D27D2D] p-6 rounded-lg shadow-md border border-[#CD7F32]"
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Enter Title..."
        value={note.title}
        onChange={changeHandler}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#CD7F32] focus:outline-none"
      />

      {/* Toolbar */}
      {editor && (
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded font-bold ${
              editor.isActive("bold")
                ? "bg-white text-[#A0522D]"
                : "bg-[#A0522D] text-white"
            }`}
          >
            B
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded italic ${
              editor.isActive("italic")
                ? "bg-white text-[#A0522D]"
                : "bg-[#A0522D] text-white"
            }`}
          >
            I
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded underline ${
              editor.isActive("underline")
                ? "bg-white text-[#A0522D]"
                : "bg-[#A0522D] text-white"
            }`}
          >
            U
          </button>
        </div>
      )}

      {/* Tiptap Editor */}
      <div className="w-full p-3 rounded-lg bg-white text-black border border-[#CD7F32] min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#A0522D] text-white rounded-lg font-bold hover:bg-white hover:text-[#A0522D] hover:border border-[#A0522D] border-2 transition"
      >
        Update Note
      </button>
    </form>
  </main>
</div>

  );
}

export default EditNotes;
