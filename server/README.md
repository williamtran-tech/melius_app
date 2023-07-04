# Instruction to start the server

# 1. Config the database connection

In the file `src/configs/database.config.ts`, change the `development` section to match your database connection.

## Create database

```
create database [name_of_database]
```

## Create tables

Access the file `src/app.ts` and uncomment the line `// await sequelize.sync({ force: true });` to create the tables.

_This will drop all the tables and create new ones._

To keep the data, comment the line `// await sequelize.sync({});` and run the following command to create the tables.

# 2. Seeding data from Recipes dataset

```
cd src/orm
npx sequelize-cli db:seed --seed 20230630152016-create-recipes.js
```

Undo the seed

```
npx sequelize-cli db:seed:undo --seed 20230630152016-create-recipes.js
```
