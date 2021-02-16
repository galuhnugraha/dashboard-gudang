import { action, observable } from 'mobx';
import { http } from "../utils/http";
import Cookies from 'universal-cookie';


export class AuthStore {
    @observable isLoading = false;
    @observable data = [];

    constructor(context) {
        this.context = context;
    }

    @action
    register = async (data) => {
        this.isLoading = true;
        return http.post("/registerv2").send(data)
            .then((res) => {
                this.isLoading = false;
                return res;
            }).catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    @action
    registerUsers = async (data) => {
        this.isLoading = true;
        const cookie = new Cookies();
        const token = cookie.get("Token")
        return http.post("/register").set({ 'authorization': `Bearer ${token}` }).send(data)
            .then((res) => {
                this.isLoading = false;
                return res;
            }).catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    @action
    login = async (data) => {
        
        this.isLoading = true;
        const cookie = new Cookies();
        return http.post(`/login`).send(data)
            .then((res) => {
                const token = res.body.data.token
                const name = res.body.data.UserName
                // localStorage.setItem("name",name);
                // localStorage.setItem("token", token)
                cookie.set('Token', token ,{ expires: new Date(Date.now() + 86400000)} )
                cookie.set('name', name,{ expires: new Date(Date.now() + 86400000)})
                this.isLoading = false;
                return res;
            })
            .catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    @action
    async logout() {
        const cookie = new Cookies();
        cookie.remove('Token');
        cookie.remove('name');

    }


    
}