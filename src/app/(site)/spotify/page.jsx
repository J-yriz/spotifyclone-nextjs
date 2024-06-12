'use client';
import Cryptr from 'cryptr';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';

import config from '@/config';
import Search from "../component/search";
import ResultSearch from "../component/resultSearch";
import PlayBack from '../component/playBack';
import CheckMe from '../component/checkMe';

export default function Home() {
    const urlYoutube = useRef([]);
    const [data, setData] = useState();
    const [music, setMusic] = useState();
    const [token, setToken] = useState('');
    const [results, setResults] = useState([]);
    
    useEffect(() => {
        setMusic(new Audio());
        const tokenMiaw = Cookies.get("token");
        const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 20 });
        if (tokenMiaw) {
            setToken(cryptr.decrypt(tokenMiaw));
        }
    }, []);


    return (
        <main>
            <Search setResults={setResults} token={token} lavalink={config.lavalink} />
            <ResultSearch results={results} setData={setData} lavalink={config.lavalink} audioMusic={music} queueMusic={urlYoutube}/>
            <PlayBack data={data} audioMusic={music} queueMusic={urlYoutube}/>
        </main>
    );
}