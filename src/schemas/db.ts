import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { markerSchema } from "./marker.schema";
import { userSchema } from './user.schema';

const collections = {
  markers: {
    schema: markerSchema,
  },
  users: {
    schema: userSchema,
  }
}

let dbPromise: Promise<any> | null = null;
/**
* Function which creates the Database
* @private
*/
const _create = async () => {
  console.log('DatabaseService: creating database..');

  const db = await createRxDatabase({
    name: "checklist_markersdb",
    storage: getRxStorageDexie(),
    password: "myLongAndStupidPassword",
  });

  console.log('DatabaseService: created database');

  await db.addCollections(collections);

  return db;
};

export function getDatabase() {
  if (!dbPromise)
      dbPromise = _create();
  return dbPromise;
}