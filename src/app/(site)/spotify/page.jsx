"use client";
import Cryptr from "cryptr";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";

import config, { getBackendHost } from "@/config";
import Search from "../component/search";
import ResultSearch from "../component/resultSearch";
import PlayBack from "../component/playBack";
import CheckMe from "../component/checkMe";

export default function Home() {
    const queueMusic = useRef([]);
    const currentIndex = useRef(0);
    const [data, setData] = useState();
    const [music, setMusic] = useState();
    const [lyricsMusic, setLyricsMusic] = useState([]);
    const [lyricsShow, setLyricsShow] = useState(false);
    const [token, setToken] = useState("");
    const [results, setResults] = useState([]);
    const tokenMiaw = Cookies.get("token");

    useEffect(() => {
        setMusic(new Audio());
        const cryptr = new Cryptr("myTotallySecretKey", {
            encoding: "base64",
            pbkdf2Iterations: 10000,
            saltLength: 20,
        });
        if (tokenMiaw) {
            setToken(cryptr.decrypt(tokenMiaw));
        }
    }, []);

    return (
        <main>
            <Search token={token} setResults={setResults} getDataLavalink={config.lavalink} />
            <ResultSearch results={results} dataAudio={data} setDataAudio={setData} getUrlBackend={getBackendHost} audioMusic={music} queueMusic={queueMusic} currentIndex={currentIndex} lyricsShow={lyricsShow} lyricsMusic={lyricsMusic} />
            <PlayBack data={data} setData={setData} audioMusic={music} queueMusic={queueMusic} currentIndex={currentIndex} lyricsShow={lyricsShow} setLyricsShow={setLyricsShow} setLyricsMusic={setLyricsMusic} />
        </main>
    );
}
