import Cryptr from "cryptr";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import config from "@/config";
const { client_id, client_secret, redirect_uri, lavalink: {host, port} } = config;

export default function GetToken({ code }) {
    const router = useRouter();
    
    useEffect(() => {
        let cancel = false;
        const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 20 });
        const getToken = async () => {
            const response = await fetch(`${host}${port}/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code,
                    redirect_uri,
                    client_id,
                    client_secret
                }),
            });
            const data = await response.json();
            if (!cancel) {
                const tokned = data;
                const token = Cookies.get("token");
                if (!token) {
                    Cookies.set("token", cryptr.encrypt(tokned.access_token), { expires: 1/24 });
                } else {
                    Cookies.remove("token");
                    Cookies.set("token", cryptr.encrypt(tokned.access_token), { expires: 1/24 });
                }
                router.push("/spotify");
            }
        };
        getToken();
        return () => {
            cancel = true;
        };
    }, [code, router]);
}