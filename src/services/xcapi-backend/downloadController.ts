// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getSDK GET /api/download/getSDK */
export async function getSDKUsingGET(options?: { [key: string]: any }) {
  return request<API.Resource>('/api/download/getSDK', {
    method: 'GET',
    ...(options || {}),
  });
}
