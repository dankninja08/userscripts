type ResponseObject = {
  status: number;
  response: string | Blob | ArrayBuffer | Document | Object | null;
  responseText?: string;
  finalUrl: string;
  context: any;
};

type RequestDetails = {
  url: string;
  method?: 'GET' | 'POST';
  headers?: { [key: string]: string };
  data?: Object;
  responseType?: 'text' | 'json' | 'blob' | 'arraybuffer' | 'document';
  onload?: (responseObject: ResponseObject) => void;
  onerror?: (responseObject: ResponseObject) => void;
};

declare module GM {
  const xmlHttpRequest: (details: RequestDetails) => void;
}

export const request = async (
  details: Omit<RequestDetails, 'onload' | 'onerror'>
): Promise<ResponseObject> =>
  new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      ...details,
      onload: async (data) =>
        data.status === 200 ? resolve(data) : reject(data),
    });
  });
