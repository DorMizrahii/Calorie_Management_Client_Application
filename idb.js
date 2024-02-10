class idb {
  constructor() {
    this.db = null;
  }

  // Open or create an IndexedDB database
  static async openCalorisDB(name, version) {
    if (!window.indexedDB) {
      console.error("Your browser doesn't support IndexedDB.");
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("calories")) {
          db.createObjectStore("calories", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = event => {
        const db = new idb();
        db.db = event.target.result;
        console.log("Database initialized successfully.");
        resolve(db);
      };

      request.onerror = event => {
        console.error("IndexedDB error:", event.target.errorCode);
        reject(new Error("IndexedDB error: " + event.target.error.message));
      };
    });
  }

  // Add an entry to the 'calories' store
  async addCalories(entry) {
    if (!this.db) {
      console.error("Database has not been initialized.");
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["calories"], "readwrite");
      transaction.onerror = event => {
        console.error("Transaction error:", event.target.error);
      };

      const store = transaction.objectStore("calories");
      const request = store.add(entry);

      request.onsuccess = () => {
        console.log("Entry added successfully.");
        resolve(true);
      };
      request.onerror = event => {
        console.error("Error adding entry to IndexedDB:", event.target.error);
        reject(new Error("Error adding entry to IndexedDB: " + event.target.error.message));
      };
    });
  }

  // Fetch all entries from the 'calories' store
  async getAllCalories() {
    if (!this.db) {
      console.error("Database has not been initialized.");
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["calories"], "readonly");
      const store = transaction.objectStore("calories");
      const request = store.getAll();

      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        console.error("Error fetching entries from IndexedDB:", event.target.error);
        reject(new Error("Error fetching entries from IndexedDB: " + event.target.error.message));
      };
    });
  }
}

// Expose idb to other scripts
window.idb = idb;