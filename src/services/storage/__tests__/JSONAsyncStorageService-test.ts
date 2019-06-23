import JSONAsyncStorageService from "../JSONAsyncStorageService";

it("JSONAsyncStorageService reads json data from underlying storage", async () => {
  const storedData = { test: 1 };
  const AsyncStorageMock = {
    getItem: jest.fn(
      () => new Promise(resolve => resolve(JSON.stringify(storedData))),
    ),
  };

  const storageKey = "test";
  const storage = new JSONAsyncStorageService(
    AsyncStorageMock as any,
    storageKey,
  );

  const receivedData = await storage.read();

  expect(receivedData).toEqual(storedData);
  expect(AsyncStorageMock.getItem.mock.calls).toEqual([[storageKey]]);
});

it("JSONAsyncStorageService reads undefined from underlying storage when data isn't available", async () => {
  const AsyncStorageMock = {
    getItem: jest.fn(() => new Promise(resolve => resolve(""))),
  };

  const storageKey = "test";
  const storage = new JSONAsyncStorageService(AsyncStorageMock as any, "test");

  const receivedData = await storage.read();

  expect(receivedData).toBeUndefined();
  expect(AsyncStorageMock.getItem.mock.calls).toEqual([[storageKey]]);
});

it("JSONAsyncStorageService writes json data to the underlying storage", async () => {
  const AsyncStorageMock = {
    setItem: jest.fn(() => new Promise(resolve => resolve())),
  };

  const data = { test: 10 };
  const storageKey = "test";
  const storage = new JSONAsyncStorageService(
    AsyncStorageMock as any,
    storageKey,
  );

  await storage.write(data);

  expect(AsyncStorageMock.setItem.mock.calls).toEqual([
    [storageKey, JSON.stringify(data)],
  ]);
});
