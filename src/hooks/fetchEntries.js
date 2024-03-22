/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

// Asynchronously fetches calorie entries from IndexedDB and manages loading state.
export const fetchEntries = async (setEntries, setIsLoading) => {
  setIsLoading(true);
  try {
    const dataBase = await window.idb.openCaloriesDB("caloriesdb", 1); // Open the database.
    const fetchedEntries = await dataBase.getAllCalories(dataBase); // Retrieve entries.
    setEntries(fetchedEntries); // Update state with fetched entries.
  } catch (error) {
    console.error("Error fetching entries:", error); // Handle errors.
  } finally {
    setIsLoading(false); // Ensure loading state is reset.
  }
};
