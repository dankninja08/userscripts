type ResponseObject = {
  status: number;
  response: string | Blob | ArrayBuffer | Document | Object | null;
  responseText?: string;
  finalUrl: string;
  context: any;
};

type Details = {
  url: string;
  headers?: Object;
  responseType?: "text" | "json" | "blob" | "arraybuffer" | "document";
  onerror?: (responseObject: ResponseObject) => void;
  onload?: (responseObject: ResponseObject) => void;
};

declare var GM_xmlhttpRequest: (details: Details) => void;

export const get = async (
  details: Omit<Details, "onload" | "onerror">
): Promise<ResponseObject> =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...details,
      onload: (data) => {
        if (data.status === 200) resolve(data);
        else reject();
      },
    });
  });
