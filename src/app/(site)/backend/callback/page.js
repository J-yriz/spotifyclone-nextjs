import fs from 'fs';
import 'dotenv/config';
import request from 'request';
import { redirect } from 'next/navigation';
import queryString from 'query-string';

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
                'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                fs.writeFileSync('./src/data/token.json', JSON.stringify(body, null, 2), 'utf8');
            }
        });
        redirect('/');
    }
};