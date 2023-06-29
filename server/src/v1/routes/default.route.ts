import { Router } from "express";
import { User } from "../../orm/models/user.model";
import { Account } from "../../orm/models/account.model";
import express, { NextFunction } from "express";
export const defaultRouter = Router();

defaultRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({});
    const accounts = await Account.findAll({});
    res.status(200).json({
      msg: "This is default route",
      users: users,
      accounts: accounts,
      // dupUserAccount: dupUserAccount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

//   try {
//     const { id } = req.params;
//     const account = await Account.findOne({
//       where: {
//         userId: id,
//       },
//       attributes: ["email"],
//       include: [User],
//     });
//     res.status(200).json({
//       msg: "This is default route",
//       account: account,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// });

defaultRouter.post("/test", async (req, res) => {
  try {
    const dupUserAccount = await Account.create({
      email: req.body.email,
      password: req.body.password,
      userId: req.body.userId,
    });
    res.status(200).json({
      msg: "This is default route",
      dupUserAccount: dupUserAccount,
    });
  } catch (err: any) {
    console.log(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        msg: "1:1 relationship already exists",
      });
    } else {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
});

// defaultRouter.get(
//   "/ingredients/search",
//   async (req: express.Request, res: express.Response) => {
//     try {
//       const params = {
//         api_key: process.env.USDA_API,
//         query: req.query.ingredient,
//         dataType: ["Survey (FNDDS)"],
//         pagesize: req.query.pagesize ? req.query.pagesize : 10,
//       };

//       const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.query}&dataType=${params.dataType}&pageSize=${params.pagesize}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       console.log(data.foods[0]);

//       const responseData = {
//         foods: data.foods[0].description,
//         category: data.foods[0].foodCategory,
//         foodNutrients: data.foods[0].foodNutrients,
//       };
//       res.status(200).json({
//         msg: "This is default route",
//         foodData: responseData,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         msg: "Internal server error",
//       });
//     }
//   }
// );
