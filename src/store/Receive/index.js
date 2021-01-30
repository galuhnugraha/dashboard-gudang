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
        const data = await http.get('/receiveOrder').set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    AddReceive = async (data) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.post(`/receiveOrder/createReceiveOrder`).set({ 'authorization': `Bearer ${token}` }).send(data)
            .then((res) => {
                this.isLoading = false;
                return res;
            })
            .catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }

    @action
    deleteReceiveOrder = async (_id) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.del(`/receiveOrder/deletedReceiveOrder/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
            this.data = res.body.data;
            this.isLoading = false;
            return res;
        })
            .catch(err => {
                throw err;
            })
    }
}