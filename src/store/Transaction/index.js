import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import debounce from "lodash.debounce";


export class TransactionStore {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;
    @observable selectedFilterValue = '';

    setPageDebounced = debounce((page) => {
        this.setSearch(page);
    }, 300);

    @action
    setSearch(page = 1) {
        this.currentPage = page;
        this.search();
    }

    @action
    async getTransaction() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get("/warehouseTransaction").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    async search() {
        let filterValue = this.selectedFilterValue;
        const token = localStorage.getItem("token");
        if (!filterValue) {
            this.getTransaction();
        }
        const data = await http.get(`/warehouseTransaction?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.isLoading = false;
    }
}