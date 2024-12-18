import axiosInstance from "axiosInstance";
import GeneralApi from "../general";

class GamesApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/old_games");
  }

  async getGame(processId) {
    const res = await axiosInstance.get(`/${this.url}/${processId}`);
    return res.data;
  }

  async setGame(processId, taskList) {
    const res = await axiosInstance.post(`/${this.url}/${processId}`, {
      taskList,
    });
    return res.data;
  }

  async updateGame(processId, task) {
    const res = await axiosInstance.put(`/${this.url}/${processId}`, {
      task,
    });
    return res.data;
  }

  async deleteGame(processId) {
    const res = await axiosInstance.delete(`/${this.url}/${processId}`);
    return res.data;
  }

  async addClaim(processId, taskId, userId, username, contrib_value) {
    const res = await axiosInstance.put(
      `/${this.url}/${processId}/${taskId}/claim`,
      {
        id: userId,
        name: username,
        development: contrib_value,
      }
    );
    return res.data;
  }

  async completeTask(processId, taskId, data) {
    const res = await axiosInstance.put(
      `/${this.url}/${processId}/${taskId}/complete`,
      {
        data,
      }
    );
    return res.data;
  }

  async getTask(processId, taskId) {
    const res = await axiosInstance.get(`/${this.url}/${processId}/${taskId}`);
    return res.data;
  }

  async updateTask(processId, taskId, development) {
    const res = await axiosInstance.put(`/${this.url}/${processId}/${taskId}`, {
      development,
    });
    return res.data;
  }

  async getLeaderboard(
    processId,
    period = "global",
    activityType = "development"
  ) {
    const res = await axiosInstance.get(
      `/${this.url}/${processId}/leaderboard`
    );
    return res.data;
  }

  async revertTask(processId, taskId) {
    const res = await axiosInstance.delete(
      `/${this.url}/${processId}/${taskId}/revert`
    );
    return res.data;
  }
}

export const oldgamesApi = new GamesApi();
