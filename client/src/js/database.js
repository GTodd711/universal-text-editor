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
  await store.add({ content }); // Store the content as an object
  await tx.done;
  console.log('Content added to the database.');
};

// Function to get all content from the database
export const getDb = async () => {
  console.log('Retrieving content from the database...');
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const data = await store.getAll(); // Retrieve all content
  console.log('Content retrieved from the database:', data);
  return data;
};

// Example usage: Add content to the database
putDb('Sample content added to database')
  .then(() => console.log('Content added to database'))
  .catch((error) => console.error('Error adding content to database:', error));

// Example usage: Retrieve content from the database
getDb()
  .then((data) => console.log('Content retrieved from database:', data))
  .catch((error) => console.error('Error retrieving content from database:', error));
