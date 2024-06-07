'use client';
import Cryptr from 'cryptr';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import config from '@/config';
import Search from "../component/search";
import ResultSearch from "../component/resultSearch";
import PlayBack from '../component/playBack';
import CheckMe from '../component/checkMe';

export default function Home() {
    const [results, setResults] = useState([]);
    const [data, setData] = useState();
    const [token, setToken] = useState('');
    
    useEffect(() => {
        const tokenMiaw = Cookies.get("token");
        const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 20 });
        if (tokenMiaw) {
            setToken(cryptr.decrypt(tokenMiaw));
        }
    }, []);


    return (
        <main>
            <Search setResults={setResults} token={token} lavalink={config.lavalink} />
            <ResultSearch results={results} setData={setData} />
            <PlayBack token={token} data={data} />
        </main>
    );
}