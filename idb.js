/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

class Idb {
  constructor() {
    this.db = null; // Holds the reference to the IndexedDB database.
  }

  // Static method to ensure a single instance of the database is created or opened.
  // Utilizes the singleton pattern for IndexedDB access.
  static async openCaloriesDB(name, version) {
    if (!window.indexedDB) {
      console.error("Your browser doesn't support IndexedDB.");
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      // This event handles the creation or upgrading of the database.
      // It creates an object store if it does not already exist.
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("calories")) {
          db.createObjectStore("calories", { keyPath: "id", autoIncrement: true });
        }
      };

      // On successful database opening, wraps the IDBDatabase in an Idb instance.
      request.onsuccess = event => {
        const db = new Idb();
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

  // Adds a new entry to the 'calories' store. Ensures the database has been initialized before adding.
  async addCalories(entry) {
    if (!this.db) {
      console.error("Database has not been initialized.");
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["calories"], "readwrite");
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

  // Fetches all entries from the 'calories' store. Ensures the database is initialized before fetching.
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

// Make the Idb class globally accessible for easy creation or access to the database.
window.idb = Idb;
