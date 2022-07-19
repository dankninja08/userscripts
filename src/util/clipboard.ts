declare module GM {
  const setClipboard: (data: string) => Promise<void>;
}

export const copyToClipboard = (data: string) => GM.setClipboard(data);
