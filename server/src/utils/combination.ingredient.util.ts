import chalk from "chalk";

export default class CombinationIngredientUtil {
    public combinationIngredient (ingredients: string[]): string[] {
        const combinationIngredients: string[] = [];
        
        // slength is the number of all possible combinations
        const slength = Math.pow(2, ingredients.length);
        let temp: string[] = [];

        // Just get combination of less than 2 ingredients => 1 ingredient or 2 ingredients => reducing time of finding foods
        for (var i = 1; i < slength; i++) {
            temp = [];
            var count = 0; // Counter for the number of ingredients in the combination
            for (var j = 0; j < slength; j++) {
                if ((i & Math.pow(2, j))) {
                    temp.push(ingredients[j]);
                    count++;
                }
            }
            if (count <= 2 && temp.length > 0) { // Limiting combinations to less than two ingredients
                combinationIngredients.push(temp.join(','));
            }
        }

        // Get all possible combinations
        // for (var i = 1; i < slength; i++) {
        //     temp = [];
        //     for (var j = 0; j < slength; j++) {
        //         // Using bitwise AND
        //         if ((i & Math.pow(2, j))) {
        //             temp.push(ingredients[j]);
        //         }
        //     }
        //     if (temp.length > 0) {
        //         combinationIngredients.push(temp.join(','));
        //     }
        // }

        combinationIngredients.sort((a, b) => {
            return a.length - b.length;
        });

        return combinationIngredients;
    }
}