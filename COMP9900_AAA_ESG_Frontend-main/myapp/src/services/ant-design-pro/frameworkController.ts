// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** applyFrameworkReport POST /framework/apply */
export async function applyFrameworkReportUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.applyFrameworkReportUsingPOSTParams,
  body: API.FrameworkDTO,
  options?: { [key: string]: any },
) {
  return request<any>('/framework/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** editFramework POST /framework/edit */
export async function editFrameworkUsingPOST(
  body: API.FrameworkDTO,
  options?: { [key: string]: any },
) {
  return request<any>('/framework/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editAndApplyFramework POST /framework/edit/apply */
export async function editAndApplyFrameworkUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editAndApplyFrameworkUsingPOSTParams,
  body: API.FrameworkDTO,
  options?: { [key: string]: any },
) {
  return request<any>('/framework/edit/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** getFrameworkById GET /framework/get */
export async function getFrameworkByIdUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFrameworkByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.FrameworkDTO>('/framework/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getFrameworkById GET /framework/get/all/report */
export async function getFrameworkByIdUsingGET(options?: { [key: string]: any }) {
  return request<API.ReportDTO[]>('/framework/get/all/report', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getReportById GET /framework/get/report */
export async function getReportByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReportByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ReportDTO>('/framework/get/report', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** insertFrameworkTree POST /framework/insert */
export async function insertFrameworkTreeUsingPOST(
  body: API.FrameworkDTO,
  options?: { [key: string]: any },
) {
  return request<any>('/framework/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** insertFrameworkReport POST /framework/insert/report */
export async function insertFrameworkReportUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.insertFrameworkReportUsingPOSTParams,
  body: API.FrameworkDTO,
  options?: { [key: string]: any },
) {
  return request<any>('/framework/insert/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
