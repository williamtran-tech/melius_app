export default class CombinationIngredientUtil {
    public combinationIngredient (ingredients: string[]): string[] {
        const combinationIngredients: string[] = [];
        
        // slength is the number of all possible combinations
        const slength = Math.pow(2, ingredients.length);
        let temp: string[] = [];

        for (var i = 0; i < slength; i++) {
            temp = [];
            for (var j = 0; j < slength; j++) {
                // Using bitwise AND
                if ((i & Math.pow(2, j))) {
                    console.log(`Bitwise AND: ${i} & ${Math.pow(2, j)}:`, i & Math.pow(2, j));
                    temp.push(ingredients[j]);
                    console.log("Push: ", temp);
                }
            }
            if (temp.length > 0) {
                combinationIngredients.push(temp.join(','));
                console.log(`Push combination ${i}: `, temp);
            }
        }

        combinationIngredients.sort((a, b) => {
            return a.length - b.length;
        });

        return combinationIngredients;
    }
}