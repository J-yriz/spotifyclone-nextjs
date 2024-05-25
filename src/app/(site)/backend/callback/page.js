import fs from 'fs';
import 'dotenv/config';
import request from 'request';
import queryString from 'query-string';
import { redirect } from 'next/navigation';

const redirect_uri = 'http://localhost:3300/backend/callback';

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
                'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                fs.readFile('.env', 'utf8', (err, data) => {
                    const file = data.trim()
                        .replace(/^\s*NEXT_PUBLIC_AKSES_TOKEN=.*$/gm, '')
                        .replace(/^\s*NEXT_PUBLIC_REFRESH_TOKEN=.*$/gm, '')
                        .replace(/^\s*TOKEN_TYPE=.*$/gm, '')
                        .replace(/^\s*EXPIRES_IN=.*$/gm, '')
                        .replace(/^\s*SCOPE=.*$/gm, '')
                        .trim() + `\nNEXT_PUBLIC_AKSES_TOKEN="${body.access_token}" \nTOKEN_TYPE="${body.token_type}" \nEXPIRES_IN=${body.expires_in} \nNEXT_PUBLIC_REFRESH_TOKEN="${body.refresh_token}" \nSCOPE="${body.scope}"`;
                    fs.writeFileSync('.env', file, 'utf8');
                });
            }
        });
        redirect('/spotify');
    }
};