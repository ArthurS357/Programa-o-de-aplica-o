Back-End Summary:

Here’s a summary of my project instructions in English:

This is my back-end project using Node.js and TypeScript, and I will indicate how to correctly start the server and connect to the database:

In "ormconfig," change the database name to the designated name of the existing database and update the access password.

In the project, open the terminal and type "yarn dev". Next, open the database/migration folder and check if all entities and their respective foreign keys are in accordance. If not, please create a new one by deleting the already created entity. To create a new entity, use the following commands:

- "yarn typeorm migration:generate --name user"
- "yarn typeorm migration:run"

This will create a new entity and establish a connection with the database. Note that in "routes.ts", the authentication middleware is commented out, thus remaining disabled. Just remove the "//" and it will work again to request the token for accessing other resources.

