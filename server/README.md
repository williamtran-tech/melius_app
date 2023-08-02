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

# 2. Seeding data (Seeding only executes on development repository not the production repo)

## 2.1. Seeding data from Recipes dataset

```
cd src/orm
npx sequelize-cli db:seed --seed 20230630152016-create-recipes.js
```

Undo the seed

```
npx sequelize-cli db:seed:undo --seed 20230630152016-create-recipes.js
```

## 2.2. Seeding data from Category dataset of USDA

```
cd src/orm
npx sequelize-cli db:seed --seed 20230703100607-create-ingre-categories.js
```

## 2.3. Seeding data from Role seeder

```
cd src/orm
npx sequelize-cli db:seed --seed 20230711052934-create-roles.js
```

## 2.4. Seeding paranoid for Tables: Users, Allergies, Available_ingredients

```
cd src/orm
npx sequelize-cli db:seed --seed 20230801033236-create-soft-delete.js
```

# 3. Issues may occur

## 3.1. Error: Fetch is not defined

**Solution**: Update the Node version later than 18.0.0

## 3.2. Error: Max_allowed_packet AWS RDS

**Solution**: Change the Group Parameter in MySQL database on AWS

*Ref: https://stackoverflow.com/questions/51395925/mysql-error-max-allowed-packet-bytes-during-import-sql-script-on-database-host*

# 4. Lessons Learnt

## 4.1. Using JSON parse and stringify

The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. **The important thing is** the string must be wrapped by double quotes. For example:

```typescript
const str = "['something', 'something']";
const obj = JSON.parse(str); // This will throw an array of string
```

```typescript
const str = '["something", "something"]';
const obj = JSON.parse(str); // This will throw an error because of ' instead of "
```

## 4.2. Using Array in Sequelize MySQL
The Array data type docs says this is limited to Postgres only
 
**Solution**: Using JSON DataType for this specific field

## 4.3. The DELETE method of HTTP protocol - Data Passing
Several answers question describes bizarre behaviour when providing a body for a HTTP DELETE request

Evidence: 
- unable to send a DELETE with a body in Android
- Tomcat, Weblogic denies Delete requests that has a payload

Due to the above I decided not to use a body for my DELETE request, this seemed like the safest choice.

*Ref: https://stackoverflow.com/questions/299628/is-an-entity-body-allowed-for-an-http-delete-request*

## 4.4. Import/Export Data if the seeding file is too large 

Even batching file throw connection timeout in AWS 

**Solution:** Using MySQL Workbench to Export data from local database => Import .sql file to AWS RDS database

*Ref: https://stackoverflow.com/questions/22381577/mysql-workbench-how-to-export-mysql-database-to-sql-file*
