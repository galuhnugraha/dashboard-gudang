import { action, observable } from 'mobx';
import { http } from "../../utils/http";

export class TransactionStore {
    @observable isLoading = false;
    @observable data = [];


    @action
    async getTransaction() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get("/warehouseTransaction").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }
}