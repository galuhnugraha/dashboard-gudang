import { action, observable } from 'mobx';
import { http } from "../utils/http";

export class WarehouseStore {
    @observable isLoading = false;
    @observable data = [];
    @observable items = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;
    @observable selectedFilterValue = '';


    @action
    async getWarehouse() {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get(`/warehouse`).set({ 'authorization': `Bearer ${token}` });
        this.items = data.body.data.items
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

    @action
    updateWarehouse = async (id, data) => {
      this.isLoading = true;
      const token = localStorage.getItem("token")
      return http.put(`/warehouse/ProductOut/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    deleteWarehouse = async (_id) => {
      this.isLoading = true;
      const token = localStorage.getItem("token")
      return http.del(`/warehouse/deleteWarehouse/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
        this.delete = res.body.data;
        this.isLoading = false;
        return res;
      })
        .catch(err => {
          throw err;
        })
    }
}