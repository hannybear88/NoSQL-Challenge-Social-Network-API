# NoSQL-Challenge-Social-Network-API
HW CHALLENGE #18

## Description
Our challenge for this assignment is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. We are to use Express.js for routing, a MongoDB database, and the Mongoose ODM. In addtion to using Express.js and Mongoose packages, we also had the option to use a Javascript date library of our choice or the native Javascript `Date` object to format timestamps. 

## Table of Contents
* [Installation](#installation)
* [Getting Started](#Getting-Started)
* [User Story](#User-Story)
* [Acceptance Criteria](#Acceptance-Criteria)
* [Usage](#Usage)
* [Demo](#Demo)
* [Technologies Used](#Technologies-Used)
* [Support](#Support)
* [Credits](#Credits)
* [Contributors](#Contributors)


## Installation
`npm` install 


## Getting Started 
Use the following guidelines to set up your models and API routes
### Models 
#### User 
- `username`
    - String
    - Unique
    - Required 
    - Trimmed
- `email`
    - String
    - Required
    - Unique
    - Must match a valid email address (look into Mongoose's matching validation)
- `thoughts`
    - Arry of `_id` values referencing the `Thought` model
- `friends` 
    - Arry of `_id` values referencing the `User` model (self-reference)
#### Schema Settings 
Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field of query. 


#### Thought 
- `thoughtText` 
    - String
    - Required
    - Must be between 1 and 280 characters
- `createdAt` 
    - Date
    - Set default value to the current timestamp
    - User a getter method to format time the timestamp on query 
- `username` (The uesr that created this thought)
    - String
    - Required
- `reactions` (These are like replies)
    - Array of nested documents created with `reactionSchema`
#### Schema Settings 
Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field of query. 


### Reaction (SCHEMA ONLY)
- `reactionId` 
    - Use Mongoose's ObjectId data type
    - Default value is set to new ObjectId
- `reactionBody`
    - String
    - Required
    - 280 character maximum 
- `username` 
    - String
    - Required
- `createdAt` 
    - Date
    - Set default value to the current timestamp
    - Use a getter method to format the timestamp on query
#### Schema Settings
This will not be a model, but rather will be used as a `reaction` field's subdocument schema in the `Thought` model


### API Routes
`/api/users`
    - `GET` all users
    - `GET` a single user by its `_id` and populated thought and friend data 
    - `POST` a new user: 
    `//example data 
    { "username": "lernantino", 
    "email": "lernantino@gmail.com
    }`
    - `PUT` to update a user by its `_id` .         
    - `DELETE` to remove a user by its `_id`

#### BONUS: Remove a user's associated thoughts when deleted. 

`/api/users/:userId/friends/:friendId`
    - `POST` to add a new friend to a user's friend list
    - `DELETE` to remove a friend from a user's friend list
`/api/thoughts`
    - `GET` to get all thoughts
    - `GET` to get a single thoughts by its `_id`
    - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    ` // example data
    {
        "thoughtText": "Here's a cool thought...",
        "username": "lernatino",
        "userId": "5edff358a0fcb779aa7b118b"
    }`
    - `PUT` to update a thought by its `_id`
    -`DELETE` to remove a thought by its `_id`
`/api/thoughts/:thoughtId/reactions`
    - `POST` to create a reaction stored in single thought's `reaction` array field
    - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value


## User Story
- AS A social media startup
- I WANT an API for my social network that uses a NoSQL database
- SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
- GIVEN a social network API
- WHEN I enter the command to invoke the application
- THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Usage
`npm` start


* TAGS
    * GET all tags
        *  http://localhost:8003/api/tags
    * GET one tag by id
            * GET http://localhost:8003/api/tags/:id
    * CREATE new tag
        * POST http://localhost:8003/api/tags
        * The JSON body request should look like below: 
        `````
        {
	    "tag_name": "purple"
        }
        `````
    * UPDATE tag by id
        * PUT http://localhost:8003/api/tags/:id
        * The JSON body request should look like below: 
        `````
        {
	    "tag_name": "light purple"
        }
        `````
    * DELETE tag by id
        * DELETE http://localhost:8003/api/tags/:id
* PRODUCTS
    * GET all products
        * GET http://localhost:8003/api/products
    * GET one product by id
        * GET http://localhost:8003/api/products/:id
    * CREATE new product
        * POST http://localhost:8003/api/products
        * The JSON body request should look like below: 
        `````
        {
	        "product_name": "boots",
	        "price": 100.00,
	        "stock": 10,
	        "category_id": 5,
	        "tagIds": [6,7]
        }
        `````
    * UPDATE product by id
        * PUT http://localhost:8003/api/products/:id
        * The JSON body request should look like below: 
        `````
        {
	        "product_name": "steel toed boots",
	        "price": 150.00,
	        "stock": 20,
	        "category_id": 5,
	        "tagIds": [6,7]
        }
        `````
        * DELETE products by id
            * DELETE http://localhost:8003/api/products/:id
* CATEGORIES
    * GET all categories
        * GET http://localhost:8003/api/categories
    * GET one category by id
        * GET http://localhost:8003/api/categories/:id
    * CREATE new category
        * POST http://localhost:8003/api/categories
        * The JSON body request should look like below: 
        `````
        {
	        "category_name": "sweater"
        }
        `````
    * UPDATE category by id
        * PUT http://localhost:8003/api/categories/:id
        * The JSON body request should look like below: 
        `````
        {
	        "category_name": "sweater vest"
        }
        `````
    * DELETE category by id
        * DELETE http://localhost:8003/api/categories/:id
## Demo

<!-- Click on the button below to be directed straight to the Heroku deployed application

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://model-view-controller--mvc.herokuapp.com/) -->

## Technologies Used

![Technologies](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Technologies](https://img.shields.io/badge/-Node.js-339933?logo=Node.js&logoColor=white)
![Technologies](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white)
![Technologies](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)
![Technologies](https://img.shields.io/badge/npm%20package-express-green?style=flat-square&logo=npm)
![Technologies](https://img.shields.io/badge/npm%20package-mongoose-purple?style=flat-square&logo=npm) 
![Technologies](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB) 



## Support
If you need support or have any questions about the repo, please [open an issue](https://github.com/hannybear88/Model-View-Controller--MVC--Challenge-Tech-Blog/issues) or contact me via email at hannahkchung88@gmail.com. You can find more of my work on my GitHub, [hannybear88](https://github.com/hannybear88/).


## Credits
- Starter code provided by UCSD 
- Code by Hannah Chung


## Contributors
- Starter code provided by UCSD 
- Code by Hannah Chung