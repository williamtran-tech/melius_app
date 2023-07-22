// BMI calculation formula: weight (kg) / [height (m)]2

// TDEE calculation formula: 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + s (kcal / day) //s is step count (optional)
import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "./../orm/models/health.model";
import moment from "moment";
import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import MealPlanService from "./meal.plan.service";

export default class HealthService {
  public calculateBMI(kidData: any): number {
    try {
      let height = kidData.height / 100;
      const BMI = kidData.weight / (height * height);
      return BMI;
    } catch (err) {
      throw err;
    }
  }

  public calculateTDEE(kidData: any) {
    try {
      // Basal Metabolic Rate
      //   Here’s a step-by-step guide to calculate your BMR using the Henry Equation:

      // Weight in kg.
      // Height in m.
      // Oxford with weight and height Boys
      // • 0–3 years → BEE (kcal/d) = (28.2 × W) + (859 × H) – 371 (R2 = 0.919)
      // • 3–10 years → BEE (kcal/d) = (15.1 × W) + (74.2 × H) + 306 (R2 = 0.683)

      // Oxford with weight and height Girls
      // • 0–3 years → BEE (kcal/d) = (30.4 × W) + (703 × H) – 287 (R2 = 0.929)
      // • 3–10 years → BEE (kcal/d) = (15.9 × W) + (210 × H) + 349 (R2 = 0.680)

      // Ref: https://www.cambridge.org/core/journals/public-health-nutrition/article/basal-metabolic-rate-studies-in-humans-measurement-and-development-of-new-equations/61A9EA486ABFA478FEF2FCE1E70D5BEE
      

      // Other formulas
      // Ref: Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A., & Koh, Y. O. (1990). A new predictive equation for resting energy expenditure in healthy individuals. The American journal of clinical nutrition, 51(2), 241–247. https://doi.org/10.1093/ajcn/51.2.241
      // Mifflin-St Jeor formula:
      // Same with Harrus-Benedict formula: 
      // * Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
      // * Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

      let TDEE: number = 0;
      let BMR: number;

      let age: number = kidData.age;
      const W = kidData.weight;
      const H = kidData.height;

      if (kidData.gender === "male") {
        BMR = (10 * W) + (6.25 * H) - (5 * age) + 5;
      } else {
        BMR = (10 * W) + (6.25 * H) - (5 * age) - 161;
      }

      TDEE = BMR * kidData.PAL;
      return TDEE;
    } catch (err) {
      throw err;
    }
  }

  // Calculate Recommended Dietary Allowance
  public rdaCalculator(weight: number) {
    // RDA = Weight (kg) x 0.8 - For Adults (g/kg/day)
    // Ref: National Academy of Medicine

    const RDA = weight * 0.8;
    return RDA;
  }

  public ageCalculator(
    date: Date,
    measurement: moment.unitOfTime.Diff
  ): number {
    // measurement: "years", "months", "days", etc.
    return moment().diff(date, measurement);
  }

  public async createHealthRecord(kidData: KidHealthDTO) {
    try {
      const ageInMonth = this.ageCalculator(kidData.DOB, "months");
      const age = this.ageCalculator(kidData.DOB, "years");
      let BMI;

      const tdeeParams = {
        weight: kidData.weight,
        height: kidData.height,
        gender: kidData.gender,
        age: age,
        PAL: kidData.PAL ? kidData.PAL : 1.2,
      };
      const tdee = this.calculateTDEE(tdeeParams);
      const RDA = this.rdaCalculator(kidData.weight);

      BMI = age > 2 ? this.calculateBMI(kidData) : null;

      const healthRecord = await Health.create({
        weight: kidData.weight,
        height: kidData.height,
        bmi: BMI || null,
        tdee: tdee,
        kidId: kidData.kidId,
        rda: RDA,
      });

      return healthRecord;
    } catch (err) {
      throw err;
    }
  }

  public async updateHealthRecord(kidData: KidHealthDTO): Promise<any> {
    try {
      const ageInMonth = this.ageCalculator(kidData.DOB, "months");
      const age = this.ageCalculator(kidData.DOB, "years");
      let BMI;
      let isNew = false;
      const latestHealthRecord = await Health.findOne({
        where: { kidId: kidData.kidId },
        order: [["createdAt", "DESC"]],
      });

      const tdeeParams = {
        weight: kidData.weight,
        height: kidData.height,
        gender: kidData.gender,
        age: age,
        PAL: kidData.PAL ? kidData.PAL : 1.2,
      };
      const tdee = this.calculateTDEE(tdeeParams);

      const RDA = this.rdaCalculator(kidData.weight);
      let healthRecord = {};

      BMI = age > 2 ? this.calculateBMI(kidData) : null;

      let updatedDate = latestHealthRecord!.createdAt.toJSON().slice(0, 10);
      if (moment().diff(updatedDate, "days") >= 1) {
        // Create new health record
        healthRecord = await Health.create({
          weight: kidData.weight,
          height: kidData.height,
          bmi: BMI || null,
          tdee: tdee,
          kidId: kidData.kidId,
          rda: RDA,
        });

        isNew = true;
      } else {
        // Update health record 
        // Update return the number of rows affected
        let [rowAffected] = await Health.update(
          {
            weight: kidData.weight,
            height: kidData.height,
            bmi: BMI || null,
            tdee: tdee,
            rda: RDA,
          },
          {
            where: {
              kidId: kidData.kidId,
              createdAt: latestHealthRecord!.createdAt,
            },
          }
        );
        healthRecord = rowAffected;
      }

      return [healthRecord, isNew];
    } catch (err) {
      throw err;
    }
  }

  public async getHealthRecord(kidId: number) {
    try {
      const heathRecord = await Health.findOne({
        where: { kidId: kidId },
        attributes: ["tdee", "bmi", "rda", "updatedAt"],
        order: [["updatedAt", "DESC"]],
      });

      const responseData = {
        energy: heathRecord?.tdee,
        bmi: heathRecord?.bmi,
        rda: heathRecord?.rda,
        updatedAt: heathRecord?.updatedAt,
      };

      if (heathRecord === null) {
        throw new HttpException(404, "Health record not found");
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
