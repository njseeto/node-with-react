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

__cookie-session library vs express-session library__

The main difference:
- cookie session: the cookie is the session. The data relating to the session is stored inside the cookie.
- express session: stores a reference to a session. The data relating to the session is stored outside of the cookie.

Why use one or the other:
- express session, you can store as much data as you want.
- cookie session, can only store about 4kb (the max amount a cookie can store).

_________________
<br>

**CHAPTER 05**

__Dev vs Prod Keys__

- Allows development locally and a separate set of keys in Heroku.
- This means if the local keys are lost, you have a production copy.
- In mLabs, create a new database for production, with its own production users.
- In Google Developers,  for the prod version when creating a new OAuth client, 
be sure to add home screen / logo etc in OAuth consent screen if you want it to be production.
- For prod, redirect URL to Heroku instance.
- In the code, create an if/else statement to deal with keys for production and dev environments.
- Do push prod.js file to allow Heroku to access it.

_________________
<br>

**CHAPTER 06**

__Create React App__

- `npm install -g create-react-app`
- In your project run the following command: `create-react-app client`
- This will create the 'client' folder and it has it's own built in server
- To run this server, cd into the 'client' folder and run `npm start`

Why do we need a an Express server and a React Server?

- The Express server communicates with MongoDB grabs a JSON. It is solely concerned with serving JSON data.
- The React server, uses webpack and babel. The React server takes care of the front end application assets.
- But why do we have two separate servers? Because using Create React App makes app development a lot easier and it is worth having to deal with two separate servers.

How do we run both servers at the same time?

- We can use 'concurrently'
- We have 2 `package.json` files. One for the front end and one for the back end. Make sure you are working on the correct file
- In the backend package.json file we have added a new script `"client": "npm run start --prefix client"`
- This runs the front end server (the `--prefix client`) addition tells the machine to cd into the client folder
- `"dev": "concurrently \"npm run server\" \"npm run client\""` This script in the server package.json runs both servers using the concurrently package

<br>

__Create React App's Proxy__

The following code in the client, json.package uses the built in 'proxy' script. This script tells the app to automatically forward the `/auth/google` href onto localhost 5000, which is the Express API.

This only needs to be done for the development server. When we deploy to production, we no longer use the create-react-app server at all. Everything is executed on Heroku, that is, all the relative links automatically get re-written by the browser as heroku-app.com etc

```
"proxy": {
    "/auth/google" : {
      "target": "http://localhost:5000/"
    }
  }
```

__Architecture__

AJAX requests
<br>
- If we attempt to make an AKAX request from localhost:3000 to another domain (eg: localhost:5000), cookies are removed.
- Similarly, if you load up localhost:3000 and make an AJAX request to another domain, it becomes a CORS request.
This is a security issue that the browser places. This can be solved by making a request to the separate domain.
- The proxy helps to bypass the two above hurdles as the browser thinks it goes straight to the Express server.

__Async/Await Syntax__

- Remember `fetch` returns a promise
- res.json() allows you to read the data in the promise (the response object). This promise has to be resolved before moving on.
- this returns the json object that we care about and can now do what we want with it.

For example:
```
function fetchAlbums(){
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json))
}
fetchAlbums()
```

To write this using async/await syntax:
```
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()
    console.log(json)
}
fetchAlbums()
```


**CHAPTER 07**
__Installing Root Modules__
- Convention: Use of capitalised letter for certain files eg: App.js, indicates the file returns a component. If the file returns functions, use a lowercase eg: index.js
- The `#root` refers to the root tag in the index.html file

```
ReactDOM.render(
    <App />, document.querySelector('#root')
)
```

__Redux Review and Setup__
- Redux Store stores the state.
- Reducers help to change the state through a Combine Reducers call.
- The store allows all components in the React app to access the global state.
- Provider is a component that makes the store available to every component in the app.

__Auth Reducer__
- Responsible for deciding whether or not the user is logged in.
- Auth reducer will be passed to combine reducers call then to the store.

__React Router Setup__
- `import { BrowserRouter, Route } from 'react-router-dom'`
- BrowserRouter is the 'brain' of react router, it tells react router how to behave.
- Route is a React component, to set up a rule between a route and a set of components that will be visible on the screen.

__Visibility of Components__
- `exact` This is used in the App.js file. It is short for `exact={true}` and tells the browser to go to that exact path. If this bit of code is not present, App.js will show both components. This prevents the application from 'greedily matching'.
- If you want a component to show at all times, just treat it like any other component (eg: Header component).


__Axios and Redux Thunk__
- Axios is responsible for helping us make AJAX requests to our backend API.
- Redux Thunk makes asynchronous action creators behave the way we expect.
- The purpose of an Action Creator is to return an action.
- This action gets sent to all of the reducers.
- The reducers produces new values for store and store updates the state for all the components.

__Link Tags__
- Link help navigate the user to different routes with React Router
```
 <Link
    to={this.props.auth ? '/surveys' : '/'}
    className="left-brand-logo">
    Emaily
</Link>
```

__Stripe__
- Using react-stripe-checkout using `npm install --save react-stripe-checkout`
- You will need the _publishable key_ and _secret key_, both found on the Stripe website.
- The publishable key can be published, the secret key needs to be kept hidden.
- Set up the publishable key and secret key on the client side through the prod.js and dev.js files.
- Also set up both keys in the server via Heroku config vars.
- Stripe defaults to USD and uses cents.

__React Environment Variables__
- Documentation can be found [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)
- NOTE: Need to expose all custom environment variables beginning with `REACT_APP_`
- Define permanent environment variables through a `.env` file in the root of the project.
- We are going to make an `.env.development` and `.env.production` - these dot files will not show up in MacOS folders.


__Body Parser__
- Need to install `bodyparser`
- The Express server by default does not parse the request payload given by a post request.
- This is why we need to install bodyparser.

