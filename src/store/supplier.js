import { action, observable } from 'mobx';
import { http } from "../utils/http";
import debounce from "lodash.debounce";

export class SupplierStore {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;
    @observable selectedFilterValue = '';


    @action
    async getSupplier() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(`/supliers`).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }
}