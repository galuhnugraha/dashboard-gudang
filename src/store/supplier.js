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

    @action
    AddSupplier = async (data) => {
        this.isLoading = true;
        const token = localStorage.getItem("token")
        return http.post(`/supliers/addSupliers`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    updateSupplier = async (id, data) => {
      this.isLoading = true;
      const token = localStorage.getItem("token")
      return http.put(`/supliers/updateSuplier/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    deleteSupplier = async (_id) => {
      this.isLoading = true;
      const token = localStorage.getItem("token")
      return http.del(`/supliers/deleteSuplier/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
        this.delete = res.body.data;
        this.isLoading = false;
        return res;
      })
        .catch(err => {
          throw err;
        })
    }
}