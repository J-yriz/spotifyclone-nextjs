'use client';

import Link from "next/link";

import getID from "./getID";

export default function Home() {

  // getID('Rex Orange County', 'track');

  return (
    <main>
      <Link href="/backend/login">Login</Link>
      <br />
      <button onClick={async() => await getID('Rex Orange County', 'track')}>test</button>
    </main>
  );
}
