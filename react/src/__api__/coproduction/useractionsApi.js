import axiosInstance from "axiosInstance";
import GeneralApi from "../general";

class UserActionApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/useractions");
  }

  async addUserAction(body) {
    const res = await axiosInstance.post(`/${this.url}/action`, body);
    return res.data;
  }
}

export const userActionApi = new UserActionApi();
