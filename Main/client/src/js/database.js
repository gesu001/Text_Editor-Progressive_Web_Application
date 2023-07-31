import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // Create a connection to the database and version
  const textDb = await openDB('text', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = textDb.transaction('text', 'readwrite');
  // open up the desired object store
  const store = tx.objectStore('text');
  // use the  .add() method on the stor and pass in the content
  const request = store.add({ content: content});
  // get confirmation of the request
  const result = await request;
  console.log('data saved to the database', result);
  console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');
  //create a connection to the database and databse version
  const textDb = await openDB('text', 1);
  // create a new trasaction and specify the database and sata privileges.
  const tx = textDb.transaction('text', 'readonly');
  // open up the desired object store
  const store = tx.objectStore('text');
  // use the  .getAll() method to get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
 // console.error('getDb not implemented');

}

initdb();
