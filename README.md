# PRODUCT API DOCUMENTATION
---

## Features

- CREATE, READ, UPDATE, DELETE BLOG
- LOGIN, REGISTER
----
## Tech

Dillinger uses a number of open source projects to work properly:

- Backend: Node.js, Express.js.
- Database: Uses MongoDB as a NoSQL database to store blog, user.
----
## Installation
1. Make sure you have Node.js (version 12 or higher) and npm (Node Package Manager) installed on your system. You also need database management software like MongoDB.

2. Clone the repository

```sh
https://github.com/RyanAprs/ProductAPI.git
cd ProductAPI
```

3. Environment Configuration for backend:
create an .env file and then create a variable DB_URI=(your mongodb url)

4. Install dependencies for backend and run the app

```sh
npm install 
```
```sh
npm run dev
```

----
## API DOCUMENTATION
Base Url = http://localhost:4000

| Method | Endpoint | Usage | Example |
| ------ | ------ | ------ |----------|
| GET | read product |``/product`` |-|
| GET | read product by id | ``/product/:id`` |``/product/1``|
| POST | create product |``/product`` |-|
| PUT | update product | ``/product/:id`` |``/product/1``|
| DELETE | delete product | ``/product/:id`` |``/product/1``|
| POST | login | ``/auth/login`` | - | 
| POST | register | ``/auth/register`` | - |

build with ❤️ by RyanAprs;
