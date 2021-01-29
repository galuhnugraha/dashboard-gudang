import { action, observable } from 'mobx';
import { http } from "../../utils/http";

export class PurchaseOrder {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;

    @action
    async getPurchaseOrder() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get("/purchaseOrder").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    AddPurchaseOrder = async (data) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.post(`/purchaseOrder/createPo`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    deletePurchaseOrder = async (_id) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.del(`/purchaseOrder/deletePo/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
            this.data = res.body.data;
            this.isLoading = false;
            return res;
        })
            .catch(err => {
                throw err;
            })
    }

    @action
    updatePurchase = async (_id, data) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.put(`/purchaseOrder/updatePo/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
            .then((res) => {
                this.isLoading = false;
                return res;
            })
            .catch((err) => {
                this.isLoading = false;
                throw err;
            });
    }
}