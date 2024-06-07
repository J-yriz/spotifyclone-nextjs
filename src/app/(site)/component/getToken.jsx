import Cryptr from "cryptr";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import config from "@/config";
const { client_id, client_secret } = config;

export default function GetToken() {
    const router = useRouter();
    const diGunakan = useRef(false);
    const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 20 });
    const getToken = async () => {
        if (diGunakan.current) return;
        diGunakan.current = true;

        try {
            if ( !client_id || !client_secret ) throw new Error("Client ID or Client Secret is not defined");
            const response = await fetch(`https://accounts.spotify.com/api/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id,
                    client_secret
                }),
            });
            const { access_token } = await response.json();
            const token = Cookies.get("token");
            if (!token) {
                Cookies.set("token", cryptr.encrypt(access_token), { expires: 1 / 24 });
            } else {
                Cookies.remove("token");
                Cookies.set("token", cryptr.encrypt(access_token), { expires: 1 / 24 });
            }
            router.push("/spotify");
        } catch (error) {
            console.error("Failed to get access token:", error);
        }
    }
    useEffect(() => {
        if (!diGunakan.current) getToken();
    }, []);
}