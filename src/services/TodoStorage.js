export class TodoStorage {
  #storageType = null;
  #supportedStorages = ["localStorage", "sessionStorage"];

  constructor(type) {
    if (this.#supportedStorages.includes(type)) {
      this.#storageType = type;
    } else {
      throw new Error(
        "Unsupported storage type. Storage typ must be " +
          this.#supportedStorages.join(" ")
      );
    }
  }
  save = (key, payload) => {
    window[this.#storageType].setItem(key, JSON.stringify(payload));
  };
  getTodos = () => JSON.parse(window[this.#storageType].getItem("todos"));
  getFilterValue = () =>
    JSON.parse(window[this.#storageType].getItem("filter_value"));
  clearStorage = () => window[this.#storageType].clear();
}
