async function getChefBirthday(id) {

    let dataRecipes;

    try {

        // chiamata per ottenere la ricetta specifica
        const recipes = await fetch(`https://dummyjson.com/recipes/${id}`);

        // controllo se esiste una ricetta con l'id inserito
        if (!recipes.ok) {
            throw new Error(`Ricetta con ID ${id} non trovata `);
        }

        dataRecipes = await recipes.json();

        // mostro in console la ricetta
        console.log("Nome ricetta:", dataRecipes.name);
        console.log(dataRecipes);


    } catch (error) {
        throw new Error("Ricetta non trovata!");

    }


    try {
        // chiamata per ottenere l'id dell'user 
        const userResponse = await fetch(`https://dummyjson.com/users/${dataRecipes.userId}`);

        // controllo se esiste uno chef con l'id corrispondente
        if (!userResponse.ok) {
            throw new Error(`Chef con ID ${id} non trovato `);
        }

        const user = await userResponse.json();

        console.log("Nome Chef:", user.firstName, user.lastName);


        // ritorno la data di nascita dell'user
        return user.birthDate;

    } catch (error) {
        throw new Error("Chef non trovato!");

    }


}

(async () => {
    try {

        const birthday = await getChefBirthday(4);
        console.log("Data di nascita dello Chef:", dayjs(birthday).format('DD/MM/YYYY'));

    } catch (error) {

        console.error("Errore:", error);
    }
})();

