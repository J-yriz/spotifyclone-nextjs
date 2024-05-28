import Image from "next/image";
import SpotifyPlayer from "react-spotify-web-playback";

export default function PlayBack({ token, uri }) {
    return (
        // Example PlayBack Component use Rex Orange County data
        <div className={`playBack`}>
            <div className={`container mx-auto relative`}>
                <div className={`fixed bottom-10 left-10 right-10 bg-gray-300 rounded-lg flex items-center p-2`}>
                    <div className={`profileMusic flex items-center`}>
                        <Image
                            src={`https://i.scdn.co/image/ab67616d0000b273ff874602e13e9181c26e5f01`}
                            height={70}
                            width={70}
                            className={`rounded-lg mr-2`}
                            alt={`rex orange county`}
                        />
                        <div className="ml-2">
                            <h1 className="font-bold">Best Friends</h1>
                            <h1 className="text-sm">Rex Orange County</h1>
                        </div>
                    </div>
                    <div className={`actionMusic`}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className={`volumeMusic ml-auto mr-5`}>
                        <h1>test</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
