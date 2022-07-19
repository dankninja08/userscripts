export const pause = async (timeout: number = 1000): Promise<void> =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
