export default class CombinationIngredientUtil {
    public combinationIngredient (ingredients: string[]): string[] {
        const combinationIngredients: string[] = [];
        const slength = Math.pow(2, ingredients.length);
        let temp: string[] = [];

        for (var i = 0; i < slength; i++) {
            temp = [];
            for (var j = 0; j < slength; j++) {
                if ((i & Math.pow(2, j))) {
                    temp.push(ingredients[j]);
                }
            }
            if (temp.length > 0) {
                combinationIngredients.push(temp.join(','));
            }
        }

        combinationIngredients.sort((a, b) => {
            return a.length - b.length;
        });

        return combinationIngredients;
    }
}