- http://example.com/path?query=value

1.         Protocol

- the protocol tell the server if the request is encrypted
  HTTP HTTPS  
   Non-Encrypted Encrypted
- the protocol doesnt effect the way server handle request and can be Ignore

2.          Host

- tell the internet which server they are responsed to
- each sever have their own particualy host

3.          path

- tell the server what the client want
- define which section of code on the server should be run in order to get the correct respone

4.          query string
              KEY              VALUE
            query              value
            search             dogs
    search query parameter, tell the server what you are searching for, so the server can respone to what you want.

Action:
get post put delelte

-          REST

* rest is stand for:
  > Representation
  > State
  > Transfer
* a fancy the sever react with: Create in a standard way
  Read
  Update
  Delete
* the ideal behind rest is to treat all server Urls as access points for the various resource on the server
  [GET] http://example.com/users

- Get a list of the resource
- Acts on the entire resource
  [POST] http://example.com/users
- Used to create a new resource
- Acts on the entire resource
  [GET] http://example.com/users/1
- another get method but this time you on ly get the single item inside base on the id that you put in the url
- Act on a single resource
  [PUT] http://example.com/users/1
- Updates the resource with the given ID
- Acts on a single resource
  [DELETE] http://example.com/users/1
- Delete the resoure with the given ID
- Acts on a single resource

-             MVC
  Model
  the controler will ask for information based on the reqeust,
  the model will handle data logic
  validation
  saving
  updating
  deleting

View:
Get Presentation
will be a tempplate file that dynamicalyy rendes HTML based on the data

Controller:
responsible to handle request flow
Never handle data logic
only tell the model what to do, the respone based on the model return.
handling user request and what to do on failure or success

in this project the routes will be your controler


PROJECt
alot thing to setup:
npm init -y
npm i express ejs express-ejs-layouts
npm i --save-dev nodemon 
npm i mongoose

if you want use env you have install env with npm
npm i --save-dev dotenv

set up env file with enviroment variable
and gitignore file to ignore thing to push on repository

initilize this repository 
push to github 



sudo npm install heroku --global at the terminal
follow the heroku loging process 
remember you on the main branch

after you login with heroku and push to heroku, you must set up your mongodb atlast to and add any information needed in the setting with heroku config variable 




use it when in side the zsh:
export PATH=/opt/homebrew/bin:PATH 

use it to avoid mongoose cannot connect
brew services start mongodb/brew/mongodb-community@5.0
brew services stop mongodb/brew/mongodb-community@5.0