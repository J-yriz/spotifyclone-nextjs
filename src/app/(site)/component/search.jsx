import { useRouter } from "next/navigation";

export default function Search({ setResults, token, lavalink }) {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let searchValue = event.target.search.value;
        if (searchValue === "") {
            searchValue = " ";
        } else {
            const data = await getID(searchValue, token);
            if ( data === 401 ) {
                alert('Token Expired');
                router.push('/');
            } else {
                const dataFilter = data.map(async(e) => {
                    const data = await getLink(`${e.album.name} - ${e.artists[0].name} lyrics`, lavalink);
                    return {
                        music_name: e.album.name,
                        artist_name: e.artists[0].name,
                        image: e.album.images[0].url,
                        duration: data[0],
                        uri: data[1]
                    }
                });
                const dataFilterd = await Promise.all(dataFilter);
                const arrayData = [];
                let i = 0;
                const nameSet = new Set();
                for (const name of dataFilterd) {
                    i++;
                    if (!nameSet.has(name.music_name) ) {
                        nameSet.add(name.music_name);
                        arrayData.push(name);
                    }
                    if (i > 10) break;
                }
                setResults(arrayData);
            }
        }
    };

    return (
        <div className={`search`}>
            <form className="container flex justify-center" onSubmit={handleSubmit}>
                <div className="border-4 border-black my-5 p-2 rounded-full bg-black flex items-center justify-center">
                    <label htmlFor="search" className="text-green-400 text-xl font-bold pr-3">Search</label>
                    <input type="text" id="search" name="search" className="mr-3 p-1 border-2 outline-none rounded-lg border-black" placeholder="Rex Orange County" />
                    <button type="submit" className="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

async function getID(artist, access_token) {

    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=track&market=ES&limit=15`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    if (data.error) {
        return data.error.status;
    } else {
        return data.tracks.items;
    }

}

async function getLink(name, lavalink) {
    const { host, port, password } = lavalink;
    if (name) {
        const respone = await fetch(`${host}${port}/take`, {
            method: 'POST',
            headers: {
                Authorization: password,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                track: `ytsearch:${name}`
            })
        })
        const data = await respone.json();
        if (data.error) {
            return [0, ''];
        }
        return [data.track.info.length, data.track.info.uri];
    }
}
