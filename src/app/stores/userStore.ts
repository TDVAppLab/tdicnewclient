import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import type { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null= null;

    constructor () {
        makeAutoObservable(this);
    }

    get isLoggedin() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {
            throw error;
        }           
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
    }

    getUser = async() => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);            
        } catch (error) {
            
            //If the answer from the server is an error, delete the token and user information
            store.commonStore.setToken(null);
            window.localStorage.removeItem('jwt');
            this.user = null;

            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
//            history.push('/');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }     
    }
}