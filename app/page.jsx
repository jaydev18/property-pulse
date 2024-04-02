import Link from "next/link";

const HomePage = () => {
  console.log("hello");
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/properties">Show properties</Link>
    </div>
  );
};

export default HomePage;
