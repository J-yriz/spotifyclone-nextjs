import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import config, { getBackendHost } from "@/config";

export default function GetToken() {
    const router = useRouter();
    const diGunakan = useRef(false);
    const getToken = async () => {
        if (diGunakan.current) return;
        diGunakan.current = true;

        try {
            const response = await fetch(`${getBackendHost()}/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // The Client Object Data to send.
                body: JSON.stringify({
                    client_id: config.client_id,
                    client_secret: config.client_secret,
                }),
            });

            if (!response) {
                console.log("no data here.");
                return;
            }

            const data = await response.text();
            const token =  Cookies.get("token", data);
            if (!token) {
                Cookies.set("token", data);
            } else {
                Cookies.remove("token");
                Cookies.set("token", data);
            }
            router.push("/spotify");
        } catch (error) {
            console.error("Failed to get access token:", error);
        }
    };
    useEffect(() => {
        if (!diGunakan.current) getToken();
    }, [getToken]);
}
