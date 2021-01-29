import { action, observable } from 'mobx';
import { http } from "../../utils/http";

export class ReceiveStore {
    @observable isLoading = false;
    @observable data = [];


    @action
    async getReceive() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get("/receiveOrder").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }
}