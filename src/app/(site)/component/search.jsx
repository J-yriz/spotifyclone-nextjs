export default function Search({ setResults, token }) {
    const handleSubmit = async (event) => {
        let searchValue = event.target.value;
        if (searchValue === "") {
            searchValue = " ";
        } else {
            const data = await getID(searchValue, token);
            if ( data === 401 ) {
                alert('Token Expired\nPlease login again');
            } else {
                const dataFilter = data.map((e, i) => {
                    return {
                        music_name: e.album.name,
                        artist_name: e.artists[0].name,
                        image: e.album.images[0].url,
                        duration: e.duration_ms,
                        uri: e.uri
                    };
                });
                setResults(dataFilter);
            }
        }
    };

    return (
        <div className={`search`}>
            <form className="container flex justify-center">
                <div className="border-4 border-black my-5 p-2 rounded-full bg-black flex items-center justify-center">
                    <label htmlFor="search" className="text-green-400 text-xl font-bold pr-3">Search</label>
                    <input type="text" id="search" name="search" onKeyUp={handleSubmit} className="mr-3 p-1 border-2 outline-none rounded-lg border-black" placeholder="Rex Orange County" />
                    {/* <button type="submit" className="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button> */}
                </div>
            </form>
        </div>
    );
}

async function getID(artist, access_token) {

    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=track&market=ES&limit=10`, {
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
