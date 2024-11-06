import axiosInstance from "axiosInstance";
import GeneralApi from "../general";

class GamesApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/new_games");
  }

  async getGame(processId) {
    const res = await axiosInstance.get(`/${this.url}/${processId}`);
    return res.data;
  }

  async setGame(processId, data) {
    const res = await axiosInstance.post(`/${this.url}/${processId}`, data);
    return res.data;
  }

  async checkIfProcessHasGame(processId) {
    const res = await axiosInstance.get(`/${this.url}/${processId}/exists`);
    return res.data;
  }

  async deleteGame(processId) {
    const res = await axiosInstance.delete(`/${this.url}/${processId}`);
    return res.data;
  }

  async getLeaderboard(processId) {
    const res = await axiosInstance.get(
      `/${this.url}/${processId}/leaderboard`
    );

    return res.data;
  }

  async rewardPoints(
    processId,
    taskId,
    userId,
    assetId,
    minutes,
    contribution,
    contributionRating,
    timestampsActivity
  ) {
    const res = await axiosInstance.post(
      `/${this.url}/${processId}/rewardPoints/${taskId}/${userId}`,
      {
        minutes,
        assetId,
        contribution,
        contributionRating,
        timestampsActivity,
      }
    );
    return res.data;
  }
}

export const newGamesApi = new GamesApi();
