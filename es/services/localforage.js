import localforage from 'localforage';

export default class LocalforageService {
  constructor(name) {
    this.instance = localforage.createInstance({
      name
    });
  }

  get(key) {
    return this.instance.getItem(key);
  }

  set(key, value) {
    return this.instance.setItem(key, value);
  }

  remove(key) {
    return this.instance.removeItem(key);
  }

  clear() {
    return this.instance.clear();
  }

  getInstance() {
    return this.instance;
  }
}
