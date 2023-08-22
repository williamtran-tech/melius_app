import HandleApi from "./HandleApi";

//Make a api call to server to get available ingredients
export const getAvailableIngredient = async (ingreId) => {
  try {
    const getIngre = await HandleApi.serverGeneral.get(
      "v1/users/available-ingredients"
    );

    return getIngre.data.availableIngredientList;
  } catch (error) {
    console.error(error);
  }
};
//Make a api call to server to get FDCID
export const getIngredient = async (ingreId) => {
  try {
    const getIngre = await HandleApi.serverGeneral.get(
      "v1/ingredients/search-list",
      {
        params: {
          ingredient: ingreId,
          pageSize: 1,
        },
      }
    );

    return getIngre.data.ingredientsList[0];
  } catch (error) {
    console.error(error);
  }
};
//Make a api call to server to get ingreID by FDCID

export const findIngredient = async (ingreId) => {
  try {
    const findIngre = await HandleApi.serverGeneral.get(
      "v1/ingredients/search",
      {
        params: {
          fdcId: ingreId,
        },
      }
    );
    return findIngre.data.ingredientNutrition;
  } catch (error) {
    console.error(error);
  }
};
//findAndAdd list IngreID by FDCID
export const findAndAdd = async (fdcId) => {
  try {
    const ingreID = await findIngredient(fdcId);
    console.log(ingreID.id);
    const findIngre = await addNewIngredient(ingreID.id);
  } catch (error) {
    console.error(error);
  }
};
//Find list IngreID
export const findListIngredient = async (listIngreName) => {
  //   console.log(listIngreName);
  try {
    const listIngreIDPromises = listIngreName.map(async (ingre) => {
      const ingreFdcID = await getIngredient(ingre.name);
      //   console.log("ingreFdcID", ingreFdcID.fdcId);
      const ingreID = await findIngredient(ingreFdcID.fdcId);
      //   console.log(ingreID.id);
      return ingreID.id;
    });

    const listIngreID = await Promise.all(listIngreIDPromises);

    const ingredientIDsString = listIngreID.join(",");
    console.log("listIngreID: ", ingredientIDsString);
    const findIngre = await addNewIngredient(ingredientIDsString);
  } catch (error) {
    console.error(error);
  }
};
export const addNewIngredient = async (ingreId) => {
  try {
    const addNewIngre = await HandleApi.serverGeneral.post(
      "/v1/users/available-ingredients",
      {
        ingredientIds: ingreId,
        dueTime: 1,
      }
    );
    console.log(addNewIngre.data);
  } catch (error) {
    console.error(error);
  }
};
