import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";
import RecipeService from "../../services/recipe.service";
import USDAService from "../../services/usda.service";
import axios from "axios";
import cheerio from "cheerio";

// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class RecipeController extends BaseController {
  constructor() {
    super();
  }
  public recipeService = new RecipeService();
  public USDAService = new USDAService();

  public getRecipes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const limit = req.query.limit ? req.query.limit : 10;
      const recipes = await this.recipeService.getRecipes(Number(limit));

      res.status(200).json({
        msg: "Successfully get recipes",
        recipes: recipes,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };
  
  // Search meal by name
  public searchRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Query: ", req.query);
      const name: string = req.query.name ? req.query.name.toString() : "";
      const recipes = await this.recipeService.searchRecipes(name);
      res.status(200).json({
        msg: "Successfully get recipes",
        recipes: recipes,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get meal by Id
  public searchRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const recipe = await this.recipeService.getRecipeById(Number(id));
      res.status(200).json({
        msg: "Successfully get recipe",
        recipe: recipe,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get Recipe URLs error in getting the recipe url
  public async crawlRecipeUrls(url: string, recipeUrls: string[] = []): Promise<string[]> {
    const baseUrl = 'https://www.food.com/recipe'; // Update with actual base URL
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    

    // Extract recipe URLs and add them to the array
    $('.tile-stream').each((index, element) => {
      const recipeUrl = $(element).find('.fd-tile').attr('href');
      console.log('Element:', element)
      console.log('Recipe URL:', recipeUrl)
      if (recipeUrl) {
        recipeUrls.push(recipeUrl);
      }
    });
      // Check if there's a "Next" page and continue crawling
      const nextPageUrl = $('button.gk-aa-load-more').attr('data-next-page');
      console.log('Next Page URL:', nextPageUrl)
      const limit = 1;
      console.log('Recipe URLS:', recipeUrls);
      if (nextPageUrl) {
        if (recipeUrls.length >= limit) {
          return recipeUrls;
        }
        
        // return this.crawlRecipeUrls(`${baseUrl}${nextPageUrl}`, recipeUrls);
      }

      return recipeUrls;
  }

  public async extractRecipeData(url: string): Promise<any> {
    // const recipeUrl = 'https://www.food.com/recipe/vietnamese-beef-and-rice-noodle-soup-pho-28814?units=metric&scale=4-6';
    const recipeUrl = url;
    const response = await axios.get(recipeUrl);
    const $ = cheerio.load(response.data);

    // Extract recipe name
    console.log('Extracting recipe name...');
    const recipeName = $('h1.svelte-1muv3s8').text().trim();
    console.log('Recipe Name:', recipeName);

    // Extract ingredients
    const ingredients: any[] = [];
    $('ul.ingredient-list li').each((index, element) => {
      const quantity = $(element).find('span.ingredient-quantity').text().trim();
      const text = $(element).find('span.ingredient-text').text().trim();
  
      ingredients.push({ text, quantity });
    });
    // Text measurement name
    // Quantity measurement value
    console.log('Ingredients:', ingredients[0]['text']);

    // Extract directions
    const directions: string[] = [];
    $('li.direction').each((index, element) => {
      const step = $(element).text().trim();
      directions.push(step);
    });
    console.log('Directions:', directions);
  }

  public fetchRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = 'https://www.food.com'; // Update with actual base URL
      const mainPageUrl = `${baseUrl}/recipes`;

      // Crawl recipe URLs
      console.log('Crawling recipe URLs...');
      const recipeUrls = await this.crawlRecipeUrls(mainPageUrl);
      const recipeDataArray: any[] = [];

      for (const url of recipeUrls) {
        const recipeData = await this.extractRecipeData(`${baseUrl}${url}`);
        recipeDataArray.push(recipeData);
      }
      console.log('Recipe URLs:', recipeUrls);

      res.status(200).json({
        msg: "Successfully get recipes",
        // recipes: directions,
        recipeUrls: recipeUrls,
      });
    } catch (err) {
      next(err);
    }
  };
}
