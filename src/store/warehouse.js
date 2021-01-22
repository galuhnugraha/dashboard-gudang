import { action, observable } from 'mobx';
import { http } from "../utils/http";

export class WarehouseStore {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;
    @observable selectedFilterValue = '';


    @action
    async getWarehouse() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(`/warehouse`).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    AddWarehouse = async (data) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.post(`/warehouse/createWarehouse`).set({ 'authorization': `Bearer ${token}` }).send(data)
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