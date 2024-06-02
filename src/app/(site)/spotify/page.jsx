'use client';
import { useState } from 'react';
import config from '@/config';

import Search from "../component/search";
import ResultSearch from "../component/resultSearch";
import PlayBack from '../component/playBack';
import CheckMe from '../component/checkMe';

const access_token = config.access_token;

export default function Home() {
    const [results, setResults] = useState([]);
    const [uri, setUri] = useState([]);

    console.log('access_token', access_token);

    return (
        <main>
            <Search setResults={setResults} token={access_token} lavalink={config.lavalink} />
            <ResultSearch results={results} setUri={setUri} />
            <PlayBack token={access_token} uri={uri} />
            {/* <CheckMe token={access_token} music={`somebody pleasure`} /> */}
        </main>
    );
}
