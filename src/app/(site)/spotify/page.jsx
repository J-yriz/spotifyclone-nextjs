'use client';

import { useState } from 'react';
import Search from "../component/search";
import ResultSearch from "../component/resultSearch";
import PlayBack from '../component/playBack';
import CheckMe from '../component/checkMe';

// Take data token from .env
const access_token = process.env.NEXT_PUBLIC_AKSES_TOKEN;

export default function Home() {
    const [results, setResults] = useState([]);
    const [uri, setUri] = useState([]);

    return (
        <main>
            <Search setResults={setResults} token={access_token} />
            <ResultSearch results={results} setUri={setUri} />
            <PlayBack token={access_token} uri={uri} />
            <CheckMe token={access_token} />
        </main>
    );
}
