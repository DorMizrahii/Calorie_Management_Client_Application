export const fetchEntries = async (setEntries, setIsLoading) => {
  setIsLoading(true);
  try {
    const database = new CalorieDB();
    await database.openDB("caloriesdb", 1);
    const fetchedEntries = await database.getAllCalories(database);
    setEntries(fetchedEntries);
  } catch (error) {
    console.error("Error fetching entries:", error);
  } finally {
    setIsLoading(false);
  }
};
