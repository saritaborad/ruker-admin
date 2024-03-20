import axios, { AxiosResponse } from "axios";
async function callAPI({
  method,
  endpoint,
  data,
  headers,
  params,
}: any): Promise<void | any> {
  // const config = {
  //   method,
  //   endpoint,
  //   data,
  // };

  try {
    const response: AxiosResponse = await axios({
      url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
      method: method,
      responseType: "json",
      headers: {
        Authorization: 'Bearer ',
        ...headers,
      },
      data,
      params,
    });

    return response.data;
  } catch (err) {
    return err;
  }
}

export const getApi = async ({
  endpoint,
  headers,
  noNeedSuccess,
}: {
  endpoint: string;
  headers?: object | string;
  noNeedSuccess?: boolean;
}) => {
  return await callAPI({
    endpoint,
    method: "get",
    headers,
    noNeedSuccess,
  });
};

export const postApi = async ({
  endpoint,
  headers,
  data,
}: {
  endpoint: string;
  headers?: object | string;
  data?: object | Array<any> | string | number | boolean;
}) => {
  return await callAPI({
    endpoint,
    method: "post",
    data,
  });
};

export const putAPI = async ({
  endpoint,
  headers,
  data,
}: {
  endpoint: string;
  headers?: object | string;
  data?: object | Array<any> | string | number | boolean;
}) => {
  return await callAPI({
    endpoint,
    method: "put",
    data,
  });
};