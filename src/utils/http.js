import superagent from "superagent";
import { appConfig } from "../pages/config/app";
import { store } from "./useStores";

export const http = {
    token: '',

    get: (url, opts = {}) => {
        return superagent.get(appConfig.apiUrl + url);
    },
    post: (url, opts) => {
        let apiUrl = opts?.apiUrl ? opts.apiUrl + url : appConfig.apiUrl + url;
        let q = superagent.post(apiUrl);
        if (store.token) {
            q = q.set({
                'Authorization': 'Bearer ' + store.token
            })
        }
        return q;
    },
    put: (url, opts) => {
        let apiUrl = opts?.apiUrl ? opts.apiUrl + url : appConfig.apiUrl + url;
        let q = superagent.put(apiUrl);
        if (store.token) {
            q = q.set({
                'Authorization': 'Bearer ' + store.token
            })
        }
        return q;
    },
    del: (url, opts) => {
        return superagent.del(appConfig.apiUrl + url);
    }
};