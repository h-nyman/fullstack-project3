# Code Snippet Library API (Project 2)

## Live Deployment
Live: https://snippet-api-d5w9.onrender.com

## Run Locally

### Setup Instructions
Create .env file with your MongoDB connection string as MONGODB_URI.

Proceed to install dependencies and start the server:

```
npm install 

npm start
```

Open http://localhost:3000/ 

## Features
- Create snippets of code
- Fetch a single snippet
- Searching for snippets by filter
- Update snippets
- Delete snippets

## Windows and macOS Notes
Open VS Code terminal. The commands are the same on both platforms.

## Testing

First I created a new snippet with this curl command:

```
% curl --request POST \
  --url http://localhost:3000/api/snippets \
  --header 'Content-Type: application/json' \
  --data '{
        "title": "Hello World",
        "language": "javascript",
        "code": "console.log(\"Hello World!!\")"
}
```
Which gave me this snippet:

```
{
  "title": "Hello World",
  "language": "javascript",
  "code": "console.log(\"Hello World!!\")",
  "tags": [],
  "_id": "692edf753d638d5c156ef07f",
  "created_at": "2025-12-03T11:50:59.649Z",
  "__v": 0
}
```

After this I tried to update the snippet (deleting the exclamation marks):

```
% curl --request PUT \
  --url http://localhost:3000/api/snippets/692edf753d638d5c156ef07f \
  --header 'Content-Type: application/json' \
  --data '{
        "title": "Hello World",
        "language": "javascript",
        "code": "console.log(\"Hello World\")"
}
```
Which updated the snippet like this:

```
{
  "_id": "692edf753d638d5c156ef07f",
  "title": "Hello World",
  "language": "javascript",
  "code": "console.log(\"Hello World\")",
  "tags": [],
  "created_at": "2025-12-02T12:45:41.951Z",
  "__v": 0
}
```

And lastly, I deleted the snippet:

```
% curl --request DELETE \
  --url http://localhost:3000/api/snippets/692edf753d638d5c156ef07f
```
Which deleted the snippet and gave this message: 
```
{
  "message": "Deleted",
  "id": "692edf753d638d5c156ef07f"
}
```

## Reflection
I have built a Code snippet library that allows users to store and manage small pieces of reusable code. In this library, you can create new snippets, search for existing ones, update them, and delete those that are no longer useful. It is a good way to store useful snippets of code in an ordered fashion, that you can reuse in the future. 

I have learned how to use CURL. Instead of using Postman, I tried Insomnia, which turned out to be a very user-friendly tool for making requests and testing my API. I also learned more about building my own API routes. Setting them up by myself helped me to understand how they work and how they are built. I have also deepened my knowledge about CRUD and using Mongo DB. 

If I were to make any improvements to this project, I would like to work on how to further categorize the snippets, to make searching for a certain snippet as easy as possible. It would also be interesting to build a simple web interface for this library using the React knowledge I gained in another study unit. Creating forms that interact with the API would make the application feel more complete and user-friendly.
