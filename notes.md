App link: https://stormy-journey-45667.herokuapp.com/


**CHAPTER 01**

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


______________________
<br>

**CHAPTER 02**

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


**Heroku Depoyments**
- Make the change, save it
- run `git add` `git commit -m (comment)`
- run `git push heroku master` to push changes to heroku

___________________
<br>

**CHAPTER 03**

__OAuth__
- Using PassportJS to help implement OAuth
- PassportJS uses two libraries: Passport (general helpers that handle authentication in Express apps) and Passport Strategy (specific helpers for authenticating with one specific method eg: Google or Facebook).
- Passport Strategy only handles one specific method. If you want to use Facebook and Google for authentication, you need to use 2 passport strategies.


`passport.use(new GoogleStrategy())`
Tells passport to use this specific strategy.

console.developers.google.com
Google developers website to access Google APIS.

__Authorise redirect URIs__
- 400 status - 'redirect error mismatch'
- Security related, makes sure users do not get redirected to a malicious site.
- To fix this, list the redirect URI in the credentials section of your Google developers console.

Access token: If we had asked for permission on the users behalf, the access token allows us to do this.
Refresh token: Used to refresh the access token, the access token expires after some amount of time.
Profile: Has information about the user.

_____________________
<br>

**CHAPTER 04**

__MongoDB__

- Mongoose library is used to help us hook up the MongoDB.
- Mongoose helps to create a new 'collection' in Mongo
- A model class is used in Mongoose which automatically creates a collection in Mongo
- Using [mLab](https://mlab.com/home)
- This database is used to save our collection of users. This will help verify users visiting the app.

__Authentication__
- Request comes in, cookie-session will extract data from cookie
- Passport will grab the id from the cookie
- id is passed to deserializer function and will turn id into user
- user is added to request object as `req.user`
- request goes to the route handler
