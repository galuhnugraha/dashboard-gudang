import { action, observable } from 'mobx';
import { http } from "../../../utils/http";

export class NoFormScreen {
    @observable isLoading = false;
    @observable data = ''

    @action
    async getNoRef() {
        // if (filter != null) {
        //   this.query.filter = filter;
        // }
        this.isLoading = true;
        const token = localStorage.getItem("token")
        const data = await http.get("/purchaseOrder/getNoForm").set({ 'authorization': `Bearer ${token}` });
        // console.log(data.body.codeNumber)
        this.data = data.body.codeNumber;
        console.log(this.data,'data')
        // this.maxLength = data.body.totalData;
        this.isLoading = false;
    }

}