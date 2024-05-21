const access_token = process.env.NEXT_PUBLIC_AKSES_TOKEN;

export default async function getID(artist, type) {

    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${type}&market=ES&limit=5`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    alert('test')

}