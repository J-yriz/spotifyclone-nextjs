import Link from "next/link";

import config from "@/config";

const { client_id, client_secret, redirect_uri } = config;

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=user-read-private%20user-read-email&redirect_uri=${redirect_uri}`;

export default function Home() {
  return (
    <main>
      {/* LOGIN */}
      <div className={`Login flex items-center justify-center min-h-screen`}>
        <div className={"w-36 h-20 bg-black rounded-3xl flex justify-center py-5"}>
          <div className={"w-28 h-9 bg-green-500 hover:bg-green-600 rounded-3xl flex justify-center"}>
            <Link className={`w-20 h-7 text-white hover:text-gray-200 text-2xl font-black`} href={`${authUrl}`}>LOGIN</Link>
          </div>
        </div>
      </div>
    </main>
  );
}