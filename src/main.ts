console.log('ex-compleanno chef with Typescript');

import dayjs from "dayjs";


async function getChefBirthday(id: number): Promise<string> {
  let dataRecipes: {
    name: string;
    userId: number;
  };

  try {
    const recipes = await fetch(`https://dummyjson.com/recipes/${id}`);

    if (!recipes.ok) {
      throw new Error(`Ricetta con ID ${id} non trovata`);
    }

    dataRecipes = await recipes.json();
    console.log("Nome ricetta:", dataRecipes.name);
  } catch (error) {
    throw new Error("Ricetta non trovata!");
  }

  try {
    const userResponse = await fetch(`https://dummyjson.com/users/${dataRecipes.userId}`);

    if (!userResponse.ok) {
      throw new Error(`Chef con ID ${id} non trovato`);
    }

    const user: {
      firstName: string;
      lastName: string;
      birthDate: string;
    } = await userResponse.json();

    console.log("Nome Chef:", user.firstName, user.lastName);

    return user.birthDate;
  } catch (error) {
    throw new Error("Chef non trovato!");
  }
}

// // IIFE to call the function
(async () => {
  try {
    const birthday = await getChefBirthday(2);
    console.log("Data di nascita dello Chef:", dayjs(birthday).format('DD/MM/YYYY'));
  } catch (error) {
    console.error("Errore:", error);
  }
})();
