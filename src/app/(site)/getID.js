export default async function getID(artist, access_token) {

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