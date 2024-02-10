export const fetchEntries = async (setEntries, setIsLoading) => {
  setIsLoading(true);
  try {
    const database = await window.idb.openCalorisDB("caloriesdb", 1);
    const fetchedEntries = await database.getAllCalories(database);
    setEntries(fetchedEntries);
  } catch (error) {
    console.error("Error fetching entries:", error);
  } finally {
    setIsLoading(false);
  }
};
