import { action, observable } from 'mobx';
import { http } from "../../../utils/http";

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
        const token = localStorage.getItem("token")
        const data = await  http.post("/purchaseOrder/getNoForm").set({ 'authorization': `Bearer ${token}` }).send({warehouseId: this.warehouseId});
        // console.log(data.body.codeNumber)
        this.data = data.body.codeNumber;
        // this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

}