# robinhood-interview

## How to run Backend

- cd `backend`
- create `.env.development` file and add this environments

```
NODE_ENV=development
MONGODB_URI="mongodb://mongodb:27017/nestjsdb"
```

- you can run `docker compose up`
- backend will run on port 8080

## How to run Frontend

since frontend part isn't in the requirement scope, I didn't dockerize them.

- cd `frontend`
- create `.env.development` file and add this environments

```
NEXT_PUBLIC_BACKEND_API=http://localhost:8080
```

- run `npm install`
- run `npm run dev`
- frontend will run on port 3000

## APIs information

#### Interview API

- [GET] /interview - to get list of
  interviews
- [GET] /interview/:id - to get interview by id
- [POST] /interview - to create interview
- [PUT] /interview/:id - to update interview
- [DELETE] /interview/:id - to delete interview

#### Comment API

- [GET] /comment - to get all interview's comments
- [POST] /comment - to add comment into interview

## Live Demo

- for the backend, I have deployed the backend on Aws lambda using Serverless framework and this is the endpoint url `https://kff54q1vwh.execute-api.ap-southeast-1.amazonaws.com/production`

- for the frontend, I used Vercel to demonstrate the functionality of APIS which you can see on this https://robinhood-interview.vercel.app/interview

P.S. Since I used serverless on the backend side, it will take some time to spin up a server due to the cold start and I didn't implement the warm up technique yet.

## Improvement

- cache API on Redis
- unit test business logic on service modules. since I use dependencies injection, it will be easy to testing them.
