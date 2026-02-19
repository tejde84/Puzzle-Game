import { openDB } from "idb";

export const useActivityStorage = () => {
  const dbPromise = openDB("logicLooper", 1, {
    upgrade(db) {
      db.createObjectStore("dailyActivity");
    },
  });

  const saveActivity = async (date, activity) => {
    const db = await dbPromise;
    await db.put("dailyActivity", activity, date);
  };

  const getActivity = async (date) => {
    const db = await dbPromise;
    return await db.get("dailyActivity", date);
  };

  const getAllActivity = async () => {
    const db = await dbPromise;
    return await db.getAll("dailyActivity");
  };

  return { saveActivity, getActivity, getAllActivity };
};