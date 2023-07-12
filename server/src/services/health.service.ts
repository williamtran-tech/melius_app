// BMI calculation formula: weight (kg) / [height (m)]2

// TDEE calculation formula: 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + s (kcal / day) //s is step count (optional)
import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "./../orm/models/health.model";
import moment from "moment";
import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";

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

      let TDEE: number = 0;
      let BEE: number;

      let age: number = kidData.age;
      const W = kidData.weight;
      const H = kidData.height / 100;

      console.log("weight: ", W);
      console.log("height: ", H);

      if (age < 3) {
        if (kidData.gender === "male") {
          BEE = 28.2 * W + 859 * H - 371;
        } else {
          // ages 1 to 3 years need 80 kcal/kg/day
          BEE = 30.4 * W + 703 * H - 287;
        }
      } else {
        // For boys > 3 yo
        if (kidData.gender == "male") {
          BEE = 15.1 * W + 74.2 * H + 306;
        } else {
          // For girls > 3yo
          BEE = 15.9 * W + 210 * H + 349;
        }
      }
      TDEE = BEE * kidData.PAL;
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

      if (age > 2) {
        BMI = this.calculateBMI(kidData);
      }

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

  public async updateHealthRecord(kidData: KidHealthDTO) {
    try {
      const ageInMonth = this.ageCalculator(kidData.DOB, "months");
      const age = this.ageCalculator(kidData.DOB, "years");
      let BMI;
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

      if (age > 2) {
        BMI = this.calculateBMI(kidData);
      }

      if (moment().diff(latestHealthRecord!.createdAt, "days") > 1) {
        // create new health record
        healthRecord = await Health.create({
          weight: kidData.weight,
          height: kidData.height,
          bmi: BMI || null,
          tdee: tdee,
          kidId: kidData.kidId,
          rda: RDA,
        });
      } else {
        // update health record
        healthRecord = await Health.update(
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
      }

      return healthRecord;
    } catch (err) {
      throw err;
    }
  }
}
