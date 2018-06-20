**Chapter 01**

Node
- JavaScript runtime used to execute code outside of the browser.
- Simply used to run code outside of the browser.

Express
- A library using the Node JS runtime.
- A collection of functions/helpers to make writing servers a little bit easier.
- Express looks at requests and decides what bit of code will 'handle' or respond to the request.
Eg. A handler for authentication.

Node and Express
- Node listens to traffic / incoming HTTP requests through a specific port (eg: 5000)
- When traffic comes in Node routes it to the Express side of the application
- Express passes the request to the appropriate handler
- The handler responds to the requests
- The reponses are fed back to whoever made the HTTP requests


**Chapter 02**

By calling app.get we are creating a new route handler
The get method gets info about some particular record

Other request methods that can be used with include:
- post (sends info to the server)
- put (updates all the properties of something)
- delete (delete something)
- patch (update one or two properties of something)

`res.send({ hi: 'there })` Immediately close the request and send back the JSON data `{ hi: there }`

**Heroku Deployment Checklist**

Dynamic Port Binding
- Heroku tells us which port to listen to
- Make sure we listen to the port they tell us.
- `const PORT = process.env.PORT || 5000` This is where this line comes in.

Specify Node Environment
- Heroku by default uses an old version of Node. So we need to be specific on Heroku
- Declare this in the package.json
```
"engines": {
    "node": "8.8.1",
    "npm": "5.0.3"
}
```

Specify Start script
- Instruct Heroku what command to run to start the server
- Do this by adding a start script in the package.json

Create .gitignore file
- Purpose of this is so we do not commit the dependencies we've created

