import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

export class ReceiveStore {
    @observable isLoading = false;
    @observable data = [];
    @observable status = '';

    @action
    async getReceive() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await http.get('/receiveOrder').set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    AddReceive = async (data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
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
        const token = cookie.get("Token")
        return http.del(`/receiveOrder/deletedReceiveOrder/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
            // this.data = res.body.data;
            this.isLoading = false;
            return res;
        })
            .catch(err => {
                throw err;
            })
    }

    @action
    updateReceive = async (_id, data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.put(`/receiveOrder/updatedReceiveOrder/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    approveList = async () => {
        this.isLoading = true;
        const token = cookie.get("Token")
        // return http.get(`/purchaseOrder/needAprovalList`).set({ 'authorization': `Bearer ${token}` })
        //     .then((res) => {
        //         this.isLoading = false;
        //         return res;
        //     })
        //     .catch((err) => {
        //         this.isLoading = false;
        //         throw err;
        //     });
        const data = await http.get(`/purchaseOrder/needAprovalList`).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
    }
}