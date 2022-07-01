export const pause = async (): Promise<void> =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
