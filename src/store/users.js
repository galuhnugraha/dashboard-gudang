import { action, observable } from 'mobx';
import { http } from "../utils/http";


export class UserStore {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;

    constructor(context) {
        this.context = context;
    }

    @action
    setPage(page = 1) {
        this.currentPage = page;
        this.getAll();
    }

    @action
    setCurrentPage(current = 10) {
        this.pageSize = current;
        this.getAll();
    }


    @action
    async getAll() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(`/users/get?Pg=${this.currentPage}&lm=${this.pageSize}`).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }
}