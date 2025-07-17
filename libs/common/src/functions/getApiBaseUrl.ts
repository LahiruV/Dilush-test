import { configStore } from '@peerless/configs';

export const getApiBaseURL = () =>
  `${configStore.apiPath}/${configStore.uniqueKey}/`;

export const getCrystalApiBaseURL = () =>
  `${configStore.crystalApiPath}/${configStore.uniqueKey}/`;
