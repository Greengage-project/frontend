import axiosInstance from "axiosInstance";
import { getLanguage } from "translations/i18n";

export function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export default class GeneralApi {
  constructor(url, cache_key = "") {
    this.url = url;
    this.cache_key = cache_key;
  }

  async create(data) {
    return axiosInstance.post(`/${this.url}`, data);
  }

  async getMulti(params = {}, language = getLanguage()) {
    const res = await axiosInstance.get(`/${this.url}`, {
      params: removeEmpty(params),
      headers: {
        "Accept-Language": language,
      },
    });
    return res.data;
  }

  async update(id, data) {
    if (id) {
      const res = await axiosInstance.put(`/${this.url}/${id}`, data);
      return res.data;
    }
  }

  async get(id, language = getLanguage()) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}`, {
        headers: {
          "Accept-Language": language,
        },
      });
      return res.data;
    }
  }

  async getPublicbyId(id, language = getLanguage()) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/public/${id}`, {
        headers: {
          "Accept-Language": language,
        },
      });
      return res.data;
    }
  }

  async delete(id) {
    if (id) {
      const res = await axiosInstance.delete(`/${this.url}/${id}`);
      return res.data;
    }
  }

  async setFile(id, endpoint, file, language = getLanguage()) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(
      `/${this.url}/${id}/${endpoint}`,
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
          "Accept-Language": language,
        },
      }
    );
    return res;
  }

  async addAdministrator(object_id, user_id) {
    if (user_id) {
      const res = await axiosInstance.post(
        `/${this.url}/${object_id}/administrators`,
        { user_id }
      );
      return res.data;
    }
  }

  async removeAdministrator(object_id, user_id) {
    if (user_id) {
      const res = await axiosInstance.delete(
        `/${this.url}/${object_id}/administrators/${user_id}`
      );
      return res.data;
    }
  }
}
