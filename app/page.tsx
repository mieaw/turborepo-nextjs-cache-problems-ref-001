import { Repository, Time } from "./layout";

async function getTime(): Promise<Time> {
  const res = await fetch(
    "http://worldtimeapi.org/api/timezone/America/New_York",
    {
      next: {
        revalidate: 5,
      },
    }
  );

  return res.json();
}

async function getRepo(): Promise<Repository> {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");

  return res.json();
}

export default async function HomePage() {
  const [data, time] = await Promise.all([getRepo(), getTime()]);
  return (
    <>
      <h1 className="text-3xl font-bold underline">{data.full_name}</h1>
      <p>Time Now (will revalidate every 5 seconds): {time.datetime}</p>
    </>
  );
}
