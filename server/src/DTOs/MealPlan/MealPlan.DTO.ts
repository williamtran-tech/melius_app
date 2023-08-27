import { IsNumber, Max, Min, IsOptional, IsDate } from "class-validator";

class MealPlanDTO {
  @IsNumber()
  public kidId: number;

  // Range from 3 - 5
  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(5)
  public nMeal: number;

  @IsDate()
  public date: Date

  constructor(
    kidId: number,
    numberOfMeals: number,
    date: Date
  ) {
    this.kidId = kidId;
    this.nMeal = numberOfMeals;
    this.date = date;
  }
}

export default MealPlanDTO;
