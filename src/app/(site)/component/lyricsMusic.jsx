import { useState, useEffect } from "react";

export default function LyricsMusic({ getUrlBackend, lyricsMusic }) {
    const [lyrics, setLyrics] = useState('');

    useEffect(() => {
        const getLyrics = async () => {
            setLyrics('Loading lyrics...');
            const response = await fetch(`${getUrlBackend()}/lyrics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    music_name: lyricsMusic[0],
                    artist_name: lyricsMusic[1]
                })
            });

            if (response.ok) {
                const data = await response.text();
                setLyrics(formatLyrics(data));
            } else {
                setLyrics('Lyrics not found');
            }
        }
        getLyrics();
    }, [lyricsMusic, getUrlBackend]);

    const formatLyrics = (lyrics) => {
        return lyrics.split('\n').map((line, index) => {
            if (["[Pre-Chorus]", "[Chorus]", "[Verse 2]", "[Bridge]", "[Outro]"].includes(line.trim())) {
                return (
                    <span key={index} className="my-5">
                        {line}<br />
                    </span>
                );
            } else {
                return (
                    <span key={index}>
                        {line}<br />
                    </span>
                );
            }
        });
    };

    return (
        <div className="lyricsMusic">
            <div className="flex flex-col items-center mb-28">
                <p className="text-2xl">MUSIC LYRICS</p>
                <div className="lyrics-container mt-4 p-4 max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <p>
                        {lyrics}
                    </p>
                </div>
            </div>
        </div>
    )
}
