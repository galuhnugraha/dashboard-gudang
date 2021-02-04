import { action, observable } from 'mobx';
import { http } from "../utils/http";


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
    login = async (data) => {
        this.isLoading = true;
        return http.post(`/login`).send(data)
            .then((res) => {
                const token = res.body.data.token
                localStorage.setItem("token", token)
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
        localStorage.removeItem('token');
    }


    
}