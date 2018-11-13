export default class LocalStorage {
  constructor() {
    this.instance = window.localStorage;
  }

  get(key) {
    return this.instance.getItem(key);
  }

  set(key, value) {
    this.instance.setItem(key, value);
    return this;
  }

  remove(key) {
    this.instance.removeItem(key);
    return this;
  }
}
