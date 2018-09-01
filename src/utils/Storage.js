export default class Storage {
  constructor(storageKey, initialValue) {
    this.storageKey = storageKey

    if (!localStorage.getItem(this.storageKey)) {
      this.set(initialValue)
    }
  }

  get() {
    return JSON.parse(window.localStorage.getItem(this.storageKey))
  }

  set(data) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  clear() {
    localStorage.removeItem(this.storageKey)
  }
}
