declare module GM {
  const getValue: (key: string) => Promise<any>;
  const setValue: (key: string, value: any) => Promise<void>;
}

export async function retrieve<T = any>(key: string): Promise<T> {
  const value = await GM.getValue(key);

  try {
    return JSON.parse(value!);
  } catch (err) {
    return value;
  }
}

export const store = (key: string, value: any) =>
  GM.setValue(key, typeof value === 'object' ? JSON.stringify(value) : value);
