'use client';

import { useEffect, useState } from 'react';
import Login from "@/app/(site)/component/login";
import GetToken from "@/app/(site)/component/getToken";

export default function Home () {
  const [code, setCode] = useState('');

  useEffect(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code");
    setCode(urlCode);
  }, []);

  return <GetToken />;
};