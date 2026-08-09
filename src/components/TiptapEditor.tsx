"use client";

import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import UnderlineExtension from "@tiptap/extension-underline";
import PlaceholderExtension from "@tiptap/extension-placeholder";
import { optimizeImage } from "@/lib/imageOptimizer";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Unlink,
  Loader2,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your editorial content here...",
}: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      ImageExtension.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg border border-brand-border my-6 max-h-[500px] w-auto mx-auto object-cover",
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent underline font-medium hover:text-accent-hover",
        },
      }),
      PlaceholderExtension.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-serif max-w-none focus:outline-none min-h-[400px] px-6 py-6 font-serif text-brand-dark text-lg leading-relaxed space-y-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Handles adding hyper-links
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  // Handles image uploading and optimization
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Optimize image client-side (resize to max 1400px, compress)
      const { file: optimizedFile, width, height } = await optimizeImage(file);

      // 2. Prepare upload payload
      const data = new FormData();
      data.append("file", optimizedFile);
      if (width) data.append("width", width.toString());
      if (height) data.append("height", height.toString());

      // 3. Upload to API
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const json = await res.json();
      if (json.success && json.url) {
        editor.chain().focus().setImage({ src: json.url }).run();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="border border-brand-border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 border-b border-brand-border bg-brand-bg/20 select-none">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("heading", { level: 1 }) ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-brand-border mx-1"></div>

        {/* Inline Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("bold") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("italic") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("underline") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-brand-border mx-1"></div>

        {/* Blocks & Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("bulletList") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("orderedList") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("blockquote") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-brand-border mx-1"></div>

        {/* Links */}
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors ${
            editor.isActive("link") ? "bg-brand-bg text-accent font-bold" : ""
          }`}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors"
          title="Horizontal Line"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Image upload button */}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`p-2 rounded hover:bg-brand-bg text-brand-dark transition-colors flex items-center justify-center`}
            title="Insert Image"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="bg-white flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Styling tweaks for placeholder and Tiptap contents */}
      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          color: #a3a3a3;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap blockquote {
          border-left: 3px solid var(--color-accent);
          padding-left: 1.25rem;
          font-style: italic;
          color: #3f3f46;
          margin: 1.5rem 0;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .tiptap li {
          margin: 0.35rem 0;
        }
        .tiptap h1 {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .tiptap h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.85rem;
        }
        .tiptap h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .tiptap hr {
          border: 0;
          border-top: 1px solid var(--color-brand-border);
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
