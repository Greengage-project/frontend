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

  async getLeaderboard(processId) {
    const res = await axiosInstance.get(
      `/${this.url}/${processId}/leaderboard`
    );
    return res.data;
  }
}

export const newGamesApi = new GamesApi();
