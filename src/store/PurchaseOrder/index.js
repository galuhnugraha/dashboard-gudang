import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import * as qs from "querystring";
import Cookies from 'universal-cookie';


var cookie = new Cookies();

export class PurchaseOrder {
    baseUrl: '/purchaseOrder';
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;
    @observable dataDetail = [];
    @observable dataDetailObject = '';
    @observable query = {
        pg: 1,
        lm: 10,
        warehouseId: '',
    }
    @observable queryDetail = {
        purchaseId: '',
    }
    @observable coy = ''



    @action
    async getPurchaseOrder() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await http.get("/purchaseOrder/receiveList").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    // @action
    // async getPurchaseOrderList(filter) {
    //     if (filter != null) {
    //         this.query.filter = filter;
    //       }
    //     this.isLoading = true;
    //     const token = cookie.get("Token")
    //     const data = await http.get('/purchaseOrder' + '?' +  qs.stringify(this.queryDetail)).set({ 'authorization': `Bearer ${token}` });
    //     console.log(data,'test')
    //     return data.body.data;
    //     // this.maxLength = data.body.totalData;
    //     // this.isLoading = false;
    // }

    @action
    AddPurchaseOrder = async (data) => {
        let obj = {...data,warehouseId: this.coy}
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.post(`/purchaseOrder/createPo`).set({ 'authorization': `Bearer ${token}` }).send(obj)
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
    deletePurchaseOrder = async (id) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.del(`/purchaseOrder/deletePo/${id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
            // this.data = res.body.data;
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
        const token = cookie.get("Token")
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


    @action
    approve = async (data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.put(`/purchaseOrder/assignmentPo`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    approve2 = async (data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.put(`/purchaseOrder/assignmentPo2`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    deleteProductIn = async (data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.del(`/purchaseOrder/deletePo`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    async getPurchaseOrderList(filter) {
        if (filter != null) {
            this.query.filter = filter;
          }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await http.get('/purchaseOrder').set({ 'authorization': `Bearer ${token}` });
        // console.log(data,'test')
        this.data = data.body.data;
    }

    @action
    async getPurchaseOrderListDetail(filter) {
        if (filter != null) {
            this.query.filter = filter;
          }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await http.get('/purchaseOrder' + '?' +  qs.stringify(this.queryDetail)).set({ 'authorization': `Bearer ${token}` });
        // console.log(data,'test')
        this.dataDetailObject = data.body.data;
    }
}