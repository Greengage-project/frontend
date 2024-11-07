import axiosInstance from "axiosInstance";
import GeneralApi, { removeEmpty } from "../general";
import { coproductionSchemasApi } from "../catalogue/coproductionSchemasApi";
import { getLanguage } from "translations/i18n";

class CoproductionProcessesApi extends GeneralApi {
  constructor() {
    super("coproduction/api/v1/coproductionprocesses");
  }

  async download(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/download`, {
        responseType: "blob",
      });
      return res;
    }
  }

  async last_created_zip(id) {
    if (id) {
      const res = await axiosInstance.get(
        `/${this.url}/${id}/last_created_zip`,
        { responseType: "blob" }
      );
      return res;
    }
  }

  async importProcess(file) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axiosInstance.post(`/${this.url}/import`, formData, {
          timeout: 240000,
        });
        console.log("the response of import is: ", res?.data);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async getPublicProcesses(params = {}, language = getLanguage()) {
    const res = await axiosInstance.get(`/${this.url}/public`, {
      params: removeEmpty(params),
      headers: {
        "Accept-Language": language,
      },
    });
    return res.data;
  }

  async getProcessCatalogue(id, language = getLanguage()) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/catalogue`, {
        headers: {
          "Accept-Language": language,
        },
      });
      return res.data;
    }
  }

  async getAssets(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/assets`);
      console.log("get assets", res.data);
      return res.data;
    }
  }

  async addTeam(id, team_id) {
    if (id) {
      const res = await axiosInstance.post(`/${this.url}/${id}/add_team`, {
        team_id,
      });
      console.log("add team", res.data);
      return res.data;
    }
  }

  async addUser(id, user_id) {
    if (id) {
      const res = await axiosInstance.post(`/${this.url}/${id}/add_user`, {
        user_id,
      });
      console.log("add user", res.data);
      return res.data;
    }
  }

  async emailApplyToBeContributor(data) {
    return axiosInstance.post(`/${this.url}/emailApplyToBeContributor`, data);
  }

  async getTree(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/tree`);
      console.log("get tree", res.data);
      return res.data;
    }
  }

  async getTreeCatalogue(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/${id}/tree/catalogue`);
      return res.data;
    }
  }

  async setSchema(id, coproductionschema_id, language) {
    if (id) {
      const schema = await coproductionSchemasApi.get(
        coproductionschema_id,
        language
      );
      const res = await axiosInstance.post(
        `/${this.url}/${id}/set_schema`,
        schema
      );
      console.log("set schema", res.data);
      return res.data;
    }
  }

  async clearSchema(id) {
    if (id) {
      const res = await axiosInstance.post(`/${this.url}/${id}/clear_schema`);
      return res.data;
    }
  }

  async copy(id, label_name, from_view = "settings") {
    if (id) {
      const res = await axiosInstance.request({
        method: "post",
        url: `/${this.url}/${id}/copy?label_name=${label_name}&from_view=${from_view}`,
        timeout: 0,
      });
      return res.data;
    }
  }

  async publish(id, label_name, from_view = "settings", extractedData) {
    if (id) {
      try {
        const res = await axiosInstance.request({
          method: "post",
          url: `/${this.url}/${id}/publish_story?label_name=${label_name}&from_view=${from_view}`,
          data: extractedData,
          timeout: 0,
        });
        return res.data;
      } catch (error) {
        console.error("Error during publish:", error);
        throw error;
      }
    }
  }
}

export const coproductionProcessesApi = new CoproductionProcessesApi();
