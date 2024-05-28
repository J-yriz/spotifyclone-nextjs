import 'dotenv/config';
import queryString from 'query-string';
import { redirect } from 'next/navigation'
import Config from '@/../config'

const redirect_uri = `${Config().redirect_uri}/backend/callback`;

export default function Home() {
    const state = generateRandomString(16, Config().client_id);
    const scope = 'streaming user-read-private user-read-email app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing';

    redirect(`https://accounts.spotify.com/authorize?${
        queryString.stringify({
            response_type: 'code',
            client_id: Config().client_id,
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