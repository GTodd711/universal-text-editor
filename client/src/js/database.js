import { openDB } from 'idb';

const initdb = async () => {
  console.log('Initializing database...');
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  console.log('Database initialized.');
  return db;
};

// Function to add content to the database
export const putDb = async (content) => {
  console.log('Adding content to the database...');
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ id:1, value:content }); // Store the content as an object
  await tx.done;
  console.log('Content added to the database.');
};

// Function to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
};


// Start the database.
initdb();