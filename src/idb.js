// idb.js - A simple wrapper for IndexedDB
export class CalorieDB {
  constructor() {
    this.db = null;
  }

  async openDB(name, version) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains("calories")) {
          this.db.createObjectStore("calories", { autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this);
      };

      request.onerror = (event) => {
        reject(new Error("IndexedDB error:", event.target.error));
      };
    });
  }

  async addCalories(entry) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["calories"], "readwrite");
      const store = transaction.objectStore("calories");
      const request = store.add(entry);

      request.onsuccess = () => resolve(true);
      request.onerror = () =>
        reject(new Error("Error adding entry to IndexedDB"));
    });
  }
  async getAllCalories() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["calories"], "readonly");
      const store = transaction.objectStore("calories");

      const request = store.getAll();

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  // Add more methods as needed (e.g., querying records)
}

// Make the CalorieDB class available to other scripts
window.CalorieDB = CalorieDB;
