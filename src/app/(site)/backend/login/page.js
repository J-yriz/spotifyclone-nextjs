import 'dotenv/config';
import queryString from 'query-string';
import { redirect } from 'next/navigation'

const redirect_uri = 'http://localhost:3300/backend/callback';

export default function Home() {
    const state = generateRandomString(16, process.env.CLIENT_ID);
    const scope = 'user-read-private user-read-email';

    redirect(`https://accounts.spotify.com/authorize?${
        queryString.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope,
            redirect_uri,
            state
        })}`
    )
}

function generateRandomString(length, client_id) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + client_id;
}