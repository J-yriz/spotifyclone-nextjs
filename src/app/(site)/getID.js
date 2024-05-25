const access_token = process.env.NEXT_PUBLIC_AKSES_TOKEN;

export default async function getID(artist, type) {

    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=album,artist,playlist,track,show,episode,audiobook&market=ES&limit=10`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    if (data.error) {
        console.log('Data EROR');
    } else {
        switch (type) {
            case 'album':
                return(data.albums.items);
            case 'artist':
                return(data.artists.items);
            case 'audiobook':
                return(data.audiobooks.items);
            case 'episode':
                return(data.episodes.items);
            case 'playlist':
                return(data.playlists.items);
            case 'show':
                return(data.shows.items);
            case 'track':
                return(data.tracks.items);
            default:
                return('Data Tidak Ada');
        }
    }

}