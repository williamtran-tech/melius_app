import { IsNumber, Max, Min, IsOptional } from "class-validator";

class MealPlanDTO {
  @IsNumber()
  public kidId: number;

  // Range from 3 - 5
  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(5)
  public nMeal: number;

  constructor(
    kidId: number,
    numberOfMeals: number,
  ) {
    this.kidId = kidId;
    this.nMeal = numberOfMeals;
  }
}

export default MealPlanDTO;
