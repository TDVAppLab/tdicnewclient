import { makeAutoObservable, reaction } from "mobx";

import type { ServerError } from "../models/ServerError";

function isBrowser() {
    return typeof window !== "undefined";
}

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = isBrowser() ? window.localStorage.getItem('jwt') : null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        if (isBrowser()) {
            reaction(
                () => this.token,
                token => {
                    if (token) {
                        window.localStorage.setItem('jwt', token);
                    } else {
                        window.localStorage.removeItem('jwt');
                    }
                }
            );
        }
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}