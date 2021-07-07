# user_management_api

This is a REST API for manage users.

This contains following endpoints for manage users.

- POST on the endpoint /users (create a new user)
- GET on the endpoint /users (list all users)
- GET on the endpoint /users/:id (get a specific user)
- PATCH on the endpoint /users/:id (update the data for a specific user)
- DELETE on the endpoint /users/:id (remove a specific user)

Also, API is providing a token endpoint that generates an auth token for valid user credentials(email & password).

- POST on the endpoint /tokens (generate a new auth token)

# Get started

1. Clone API project using following command.

`` git clone https://github.com/ganeshnayanajith/user_management_api.git``

2. Install dependencies

`` npm install``

3. Run project

`` npm run start`` or `` npm run dev``

Following will be the project base URL when run locally.

`` http://localhost:3000/api/usermanagementapi ``

You can find the API docs using following URL.

`` http://localhost:3000/api/usermanagementapi/docs ``