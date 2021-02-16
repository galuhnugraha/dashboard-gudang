import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import Cookies from 'universal-cookie';

var cookie = new Cookies();



export class ProductOutScreen {
    @observable isLoading = false;
    @observable data = [];
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable maxLength = 0;

    @action
    async getProductOut() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await http.get("/formOut").set({ 'authorization': `Bearer ${token}` });
        this.data = data.body.data;
        this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

    @action
    addProductOut = async (data) => {
        this.isLoading = true;
        const token = cookie.get("Token")
        return http.post(`/formOut/createPo`).set({ 'authorization': `Bearer ${token}` }).send(data)
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