import { action, observable } from 'mobx';
import { http } from "../../utils/http";
// import debounce from "lodash.debounce";
import * as qs from "querystring";

export class SupplierReviewStore {
    baseUrl = '/supliers'
    suplier = '/dataSuplier'
    @observable data = [];
    @observable isLoading = false;
    @observable detailSuplierQuery = {
        pg: 1,
        lm: 10,
        suplierId: '',
      }

    @action
    async getSupplier() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(this.baseUrl).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    async getSupplierProductReview() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(this.suplier + '?' + qs.stringify(this.detailSuplierQuery)).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }
}