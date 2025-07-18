import axiosInstance from 'axiosInstance';
import GeneralApi from '../general';
import { getLanguage } from 'translations/i18n';

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

class AssetsApi extends GeneralApi {
  constructor() {
    super('coproduction/api/v1/assets');
  }

  async getAssetInfo(id, language = getLanguage()) {
    const res = await axiosInstance.get(`/${this.url}/internal/${id}`, {
      headers: {
        'Accept-Language': language
      }
    });
    return res.data;
  }

  async getListAssetswithInternalInfo(params = {}, language = getLanguage()) {
    // console.log(`/${this.url}/listAssetswithInternalInfo`+params);
    // Get data of user_notifications
    const res = await axiosInstance.get(`/${this.url}/listAssetswithInternalInfo`, {
      params: removeEmpty(params),
      headers: {
        'Accept-Language': language
      }
    });
    // console.log('getMulti call', res.data, 'in', language);
    return res.data;
  }

  async getMultiCatalogue(params = {}, language = getLanguage()) {
    console.log(`/${this.url}/catalogue${params}`);
    // Get data of user_notifications
    const res = await axiosInstance.get(`/${this.url}/catalogue`, {
      params: removeEmpty(params),
      headers: {
        'Accept-Language': language
      }
    });
    console.log('getMultiCatalogue call', res.data, 'in', language);
    // console.log('getMulti call', res.data, 'in', language);
    return res.data;
  }

  async create_internal(task_id, softwareinterlinker_id, external_asset_id) {
    const res = await axiosInstance.post(`/${this.url}`, {
      task_id,
      softwareinterlinker_id,
      external_asset_id,
      type: 'internalasset'
    });
    console.log('post call', res, res.data);
    return res.data;
  }

  async create_external(task_id, externalinterlinker_id, name, uri) {
    const res = await axiosInstance.post(`/${this.url}`, {
      task_id,
      externalinterlinker_id,
      name,
      uri,
      type: 'externalasset'
    });
    console.log('post call', res, res.data);
    return res.data;
  }

  async instantiate(knowledgeinterlinker_id, task_id, language) {
    const res = await axiosInstance.post(`/${this.url}/instantiate`, {
      language,
      knowledgeinterlinker_id,
      task_id
    });
    console.log('post instantiate call', res, res.data);
    return res.data;
  }

  async clone(id) {
    const res = await axiosInstance.post(`/${this.url}/${id}/clone`);
    console.log('post clone call', res, res.data);
    return res.data;
  }

  async emailAskTeamContribution(data) {
    console.log('emailAskTeamContribution data', data);
    return axiosInstance.post(`/${this.url}/emailAskTeamContribution`, data);
  }

  async emailAskUserContribution(data) {
    return axiosInstance.post(`/${this.url}/emailAskUserContribution`, data);
  }

  async getInternal(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/internal/${id}`);
      console.log('get internal call', res.data);
      return res.data;
    }
  }

  async getInternalCatalogue(id) {
    if (id) {
      const res = await axiosInstance.get(`/${this.url}/internal/${id}/catalogue`);
      console.log('get internal call', res.data);
      return res.data;
    }
  }
}

export const assetsApi = new AssetsApi();
