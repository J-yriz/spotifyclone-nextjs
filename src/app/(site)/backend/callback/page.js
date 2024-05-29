import fs from 'fs';
import 'dotenv/config';
import request from 'request';
import queryString from 'query-string';
import { redirect } from 'next/navigation';
import Config from '@/../config'

const redirect_uri = `${Config.redirect_uri}/backend/callback`;

export default function Home(req) {
    const { code, state } = req.searchParams;

    if ( state === null ) {
        redirect('/#' + 
            queryString.stringify({ 
                error: 'state_mismatch' 
            }));
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code,
                redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(Config.client_id + ':' + Config.client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200 && !body.error) {
                fs.readFile('.env', 'utf8', (err, data) => {
                    const file = data.trim()
                        .replace(/^\s*NEXT_PUBLIC_AKSES_TOKEN=.*$/gm, '')
                        .replace(/^\s*NEXT_PUBLIC_REFRESH_TOKEN=.*$/gm, '')
                        .trim() + `\nNEXT_PUBLIC_AKSES_TOKEN="${body.access_token}" \nNEXT_PUBLIC_REFRESH_TOKEN="${body.refresh_token}"`;
                    fs.writeFileSync('.env', file, 'utf8');
                });
            } else {
                redirect('/backend/login');
            }
        });
        redirect('/spotify');
    }
};