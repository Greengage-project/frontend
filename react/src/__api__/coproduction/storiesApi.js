import axiosInstance from "axiosInstance";
import GeneralApi from "../general";

class StoriesApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/stories");
  }

  async create(extractedData, process, cloneId) {
    const processId = process.id;
    const newStory = {
      data_story: extractedData,
      state: true,
      rating: 3,
      logotype: `/coproduction${process.logotype}`,
      coproductionprocess_cloneforpub_id: cloneId,
    };

    return axiosInstance.post(
      `/${this.url}/${processId}/createStory`,
      newStory
    );
  }

  async getStoriesbyId(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/story`);
      return res.data;
    }
  }

  async getStoriesbyCopro(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/listStories`);
      return res.data;
    }
  }

  async getStories() {
    const res = await axiosInstance.get(`/${this.url}/listStories`);
    return res.data;
  }
}

export const storiesApi = new StoriesApi();
