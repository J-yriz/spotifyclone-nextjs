import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import config from "@/config";
const { client_id, client_secret, redirect_uri, lavalink: {host, port} } = config;

export default function GetToken({ code }) {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        let cancel = false;
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
                setToken(data.access_token);
                router.push("/spotify");
            }
        };
        getToken();
        return () => {
            cancel = true;
        };
    }, [code]);
}