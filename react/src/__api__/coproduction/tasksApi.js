import axiosInstance from "axiosInstance";
import GeneralApi from "../general";

class TasksApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/tasks");
  }

  async checkTaskAndResource(taskId, resourceId, coproductionprocessesId) {
    if (taskId && resourceId && coproductionprocessesId) {
      const res = await axiosInstance.get(
        `/${this.url}/${taskId}/checkTaskAndResource/${resourceId}/${coproductionprocessesId}`
      );
      console.log(res?.data);
      return !!res?.data;
    }
    return null;
  }

  async getAssetsAndContributions(id) {
    if (id) {
      const res = await axiosInstance.get(
        `/${this.url}/${id}/listTaskAssetsContributions`
      );
      return res.data;
    }
  }
}

export const tasksApi = new TasksApi();
