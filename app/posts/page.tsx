import CreatePostComponent from "./components/CreatePostComponent";

const API_ENDPOINT = "http://127.0.0.1:8090";

async function getPosts() {
  const res = await fetch(
    `${API_ENDPOINT}/api/collections/posts/records?page=1&perPage=30`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data?.items as any[];
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <h1>Posts</h1>
      <br />
      <hr />
      <CreatePostComponent />
      <hr />
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

function Post({ post }: { post: any }) {
  const { id, title, content } = post || Object;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
      <h1>{id}</h1>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
