import { action, observable } from 'mobx';
import { http } from "../../../utils/http";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

export class NoFormScreen {
    @observable isLoading = false;
    @observable data = ''
    @observable warehouseId = ''

    @action
    async getNoRef() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = cookie.get("Token")
        const data = await  http.post("/purchaseOrder/getNoForm").set({ 'authorization': `Bearer ${token}` }).send({warehouseId: this.warehouseId});
        // console.log(data.body.codeNumber)
        this.data = data.body.codeNumber;
        // this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

}