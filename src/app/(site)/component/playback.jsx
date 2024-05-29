import Image from "next/image";
// import { useState, useEffect } from 'react';
import SpotifyWebPlayer from "react-spotify-web-playback";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

export default function PlayBack({ token, uri }) {

    // const [is_paused, setPaused] = useState(false);
    // const [is_active, setActive] = useState(false);
    // const [player, setPlayer] = useState(undefined);
    // const [current_track, setTrack] = useState(track);
    
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://sdk.scdn.co/spotify-player.js";
    //     script.async = true;
    //     document.body.appendChild(script);

    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         const player = new window.Spotify.Player({
    //             name: 'Web Playback SDK',
    //             getOAuthToken: cb => {
    //                 cb('BQC0PT3FeM53dwoxg9Jt1CsiMbAs3KWEg_pv0XBwzbwZFYyPUr_sUlUds1EAGDEwfpqW3KyvJVv5TGn-aW0Rg5Z7zIzWyd71jfEPk8RwuWf2A1nbKQKKnXHEDwUwsbR1LNKcr7yLeCSJllSFQ7DcTudF8B8tluVPEfMptfWHvVec7mjo9Y6M981TI3ZiHlGGA0pF2WChvkpfIDtMaR3pdz8GjR_TVmEP');
    //             },
    //             volume: 0.5
    //         });
    //         setPlayer(player);

    //         player.connect();
    //     };
    // }, []);

    // return (
    //     <div className="playBack container">
    //         <div className="main-wrapper">
    //             <p>Playback</p>
    //         </div>
    //     </div>
    // )

    return (
        <div className={`playBack`}>
            <SpotifyWebPlayer
                token={token}
                showSaveIcon
                uris={uri ? [uri] : []}
            />
        </div>
    )
}
