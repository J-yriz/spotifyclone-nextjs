import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '.env');

const dataw = {
    "access_token": "BQDPNmGODKml6O9kqnwwUDtn3Lm6B5AJSeAyElLbHXjUldgofrBTdE0D51CDgUHKGbmPjE2WxWtMVq2wgwTXopk1hwKz2-EP42am_y8d2kLB5VOWh54tICe4Ycf8pEvvbBIPNob5RpGFedrt8moMtfrkt_ajKqlGvZnfb2rLLVOXsds2WBNFMXVNUG6h6tSMMfzjvnNO0szXxN8pPSxLUw",
    "token_type": "Bearer",
    "expires_in": 3600, 
    "refresh_token": "AQD43FJTRNjeIxCjNK1fZaBxVyDewtlxFTW7wxlyGLwtCjUE9Hpdk_ZDn-e7Qh1BNgU73m3a82yU1gd_lTLfchP0O6oou88_xVmjagb_l7bTj3O-5vN5LydjR2NzmNWplAw",
    "scope": "user-read-email user-read-private"
  };

fs.readFile(file, 'utf8', (err, data) => {
    const test = data.trim().replace(/^\s*AKSES_TOKEN=.*$/gm, '').trim() + `\nTOKEN=${dataw.access_token} \nTOKEN_TYPE=${dataw.token_type} \nEXPIRES_IN=${dataw.expires_in} \nREFRESH_TOKEN=${dataw.refresh_token} \nSCOPE=${dataw.scope}`;
    console.log(test);
});