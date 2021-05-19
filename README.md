magic-potion
A fullstack application built with React, Node.JS, ExpressJS, PostGreSQL, styled with TailWindCSS, and deployed on Heroku. This application servers as the unofficial "launch page" of the magically magical Magic Potion. Fill out the form and try it for yourself!

http://magic-potion-demo.herokuapp.com/

I must mention, please DO NOT submit your actual credit card information. I do not want that on my conscience. Please use these lovely fake, yet valid test credit card numbers:

3566002020360505
5555555555554444
5105105105105100

Table of Contents
Requirements
Getting Started
Development
Production
Discussion
Next Steps
Requirements
Node v12.16.1

NPM 6.14.4

PostgreSQL 12.3

Getting Started
Installing Dependencies
Install backend dependencies within the root directory:

npm install
Also, install client dependencies:

cd /Client
npm install
Configure PostgreSQL config:
From within database.js in root, configure credentials:

const devConfig = {
  host: YOUR_HOST,
  user: YOUR_USER,
  password: YOUR_PASSWORD,
  database: YOUR_DATABASE,
};
You may input credentials directly or create a .env file. I recommend the latter. Example .env:

PG_USER = user
PG_PASSWORD = password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = magicpotion
Create Database Tables
You may use the provided schema.sql file to build the database in postgresql.

Development
Run Server in development mode
In root directory run:

npm run start-server
this will run nodemon and will watch for any changes to the server code.

Run Client App in development mode
In /client folder run,

npm start
Production
Run Server for production
In root directory run:

npm start
this will run nodemon and will watch for any changes to the server code.

Run Client App for production
In /client directory run,

npm run build
Discussion
This section is for me to discuss all the topics! I will go into my thought process behind designing the data schema as well as the architecture for the frontend and backend API, which will touch heavily on validation.

Data Schema
My data schema can be broken down into 4 main tables: products, orders, customers, products, and order_details.

Although this site technically only sells one product, Magic Potions, I felt it was important to have a products table in case this app were to scale across multiple product lines. The product table stores details such as name, price, description, and max purchase amount.

Orders holds the majority of the transaction details including billing and payment details, total price, fulfillment status, with references to customers table and order_details table via ID. Initially I considered placing billing and payment details into the customers table, but a customer can make multiple orders with different billing and payment details as long as they're purchasing less than 3 magic potions total, therefore it made more sense to keep those details in orders where the relationship is 1:1.

The customers table holds name and email. Email is used as the unique identifier for each customer, and is important for validating duplicate customers and ensuring customers aren't purchasing more than 3 magic potions.

Order_details was not heavily used in this project due to having only one product, but if the app were to scale to multiple products, where an order can have multiple products, then this table would help manage that relationship. It has foreign key references to both product id and order id.

A flaw in the schema design is the need for more complex queries across multiple tables to avoid round trip queries. For example, checking if a user has already purchased more than 3 magic potions in a given month requires multiple JOIN clauses.

How does this scale?
This schema seems like it would hold up well over a larger scale of users. I think since this app is more heavily on the write-side of things, the biggest issue would be constantly validating a customer to see if they have purchased more than the max.

Frontend Architecture
For the frontend architecture, I focused on modular components, breaking up the logic into smaller pieces, but ensuring the state was shared across each through props. I also took advantage of similar logic by extracting the logic for setting state from input values into a custom hook.

For validation, I created a validation function that checks to see if a user's inputs are valid on submission. The data would not be submitted until all checks were passed. Similar logic was also implemented on the backend for extra security and santization of inputs.

For styling, I went with TailWindCSS due to it being unopinionated, but still providing utilities that are clean and help speed up development.

API Architecture
The API is RESTful built on Node.js and Express. For each route, I implemented a validation library called express-validator that operates as middleware for each request, validating and sanitizing user inputs before the data is sent to the database.

Endpoints:

POST /api/magic
Inserts client form data into database

GET /api/magic/<uid>
Fetches data from database for given unique order id

PATCH /api/magic/<uid>
Updates fulfilled state of order for given unique order id

DELETE /api/magic/<uid>
Deletes order from database

What Would I Do Differently?
Frontend:

With more time, I would've separated billing form from product info and product quantity to more closely resemble a checkout flow.
One large thing I didn't get a chance to tackle was accessibility. I would definitely add more accessible features to the components with more time.
There's also room for improvement with validation. There were a few edgecases that I let slip by due to time constraint and for the sake of simplicity. If I could do it again, I would consider using a library like react-hook-forms to handle the frontend validation.
However, I do think that validation can be somewhat alleviated by better UI design, so I could also improve how my forms are formatted to give the customer a better indication of what is valid and not valid.
In my useForm hook, due to the nested shape of the form data, I used Object.keys().includes to update address and payment values. I would try to optimize this operation.
Lastly, I would've definitely liked to fully complete my unit tests.
Backend:

Implement better SQL queries to optimize response time between queries.
Improving or Scaling
As the app scales and the app complexity grows on the frontend, I would consider moving state management over to a solution like Redux or consider using the useReducer and useContext APIs. Also, to better handle more traffic, I would horizontally scale the application layer, implementing load balancers and caching to improve server efficiency.

Next Steps
[] Complete implementation of unit testing
[] Create ContinueToCheckOut button that will move user to billing
[] Extract button logic into component
[] Clean and standardize tailwind classNames