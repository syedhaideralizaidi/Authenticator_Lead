// import commonFunctions from '../helpers/commonFunctions';

import session from "./session";
import {api_urls} from "@/lib/urls";

const HOST = process.env.NEXT_PUBLIC_BASE_URL;

class Api {
    static headers(multipart = false) {
        if (multipart) {
            return {
                // 'Content-Type': `multipart/form-data`
            };
        } else {
            return {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            };
        }
    }

    static get(route, sendAuthToken = false) {
        return this.xhr(route, null, 'GET', sendAuthToken, false);
    }

    static put(route, params, sendAuthToken = false) {
        return this.xhr(route, params, 'PUT', sendAuthToken, false);
    }

    static post(route, params, sendAuthToken = false, multipart = false) {
        return this.xhr(route, params, 'POST', sendAuthToken, multipart);
    }
    static patch(route, params, sendAuthToken = false) {
        return this.xhr(route, params, 'PATCH', sendAuthToken, false);
    }

    static delete(route, params, sendAuthToken = false) {
        return this.xhr(route, params, 'DELETE', sendAuthToken, false);
    }

    static async logout() {
        localStorage.clear();
        window.location.replace('/login')
    }

    static async xhr(route, params, verb, sendAuthToken, multipart) {
        const milliseconds = Date().toString();
        if (
            sendAuthToken &&
            localStorage.getItem("access_token")
        ) {
            try {
                const refreshToken = localStorage.getItem("refresh_token");

                let refresh_url = `${HOST}${api_urls.AUTH.refreshToken}`;
                let options1 = {
                    method: "POST",
                    body: JSON.stringify({
                        refresh: JSON.parse(refreshToken),
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // mode: "no-cors",
                    },
                };
                let refTObj = await fetch(refresh_url, options1);
                let response = await refTObj.json();

                if (response?.data?.access) {
                    localStorage.setItem("token", JSON.stringify(response?.data?.access));
                    // session.setAccessTokenExpiry(response?.data?.access_expiration)
                }
            } catch (e) {
                // await Api.logout();
            }
        }
        let token = localStorage.getItem("token");
        if (!!token) {
            token = JSON.parse(token);
        }

        const url = `${HOST}${route}`;
        // console.log("url>>>>", url);
        let options = Object.assign(
            { method: verb },
            params ? { body: multipart ? params : JSON.stringify(params) } : null
        );

        options.headers = Api.headers(multipart);
        if (token && sendAuthToken) {
            options.headers.Authorization = "Bearer " + token;
        }
        // console.log("url>>>>", url);
        return fetch(url, options)
            .then((resp) => {
                let json = resp;

                if (resp.ok) {
                    return json;
                } else {
                    if (resp.status === 401) {
                        // Api.logout();
                    }
                    if (resp.status === 404) {
                    }
                    return json;
                }
                return json.then((err) => {
                    if (resp.status === 401) {
                        // Api.logout();
                    }
                    throw err;
                });
            })
            .then(async (res) => {
                let rs = {};
                try {
                    rs = {
                        res: res,
                        data: await res.json(),
                    };
                } catch (e) {
                    rs = {
                        res: res,
                    };
                }
                return rs;
            });
    }
}
export default Api;
