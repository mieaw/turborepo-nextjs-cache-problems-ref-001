"use client";

const API_ENDPOINT = "http://127.0.0.1:8090";


import { useRouter } from "next/navigation";
import { useState } from "react";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export default function CreatePostComponent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${API_ENDPOINT}/api/collections/posts/records`, {
      body: JSON.stringify({ title, content }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    // const data = await res.json();

    router.refresh();

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={createPost}>
      <h3>Create post</h3>
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2 mt-2 text-black"
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Create post
      </button>
    </form>
  );
}
