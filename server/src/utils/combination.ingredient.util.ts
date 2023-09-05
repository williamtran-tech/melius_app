import chalk from "chalk";

export default class CombinationIngredientUtil {
    public combinationIngredient (ingredients: string[]): string[] {
        const combinationIngredients: string[] = [];
        
        // slength is the number of all possible combinations
        const slength = Math.pow(2, ingredients.length);
        let temp: string[] = [];

        for (var i = 1; i < slength; i++) {
            temp = [];
            for (var j = 0; j < slength; j++) {
                // Using bitwise AND
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