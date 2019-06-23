### To start project
  1) server
    - cd server
    - composer install
    - convigure .env file
    - create db
    - php artisan migrate --seed
    - php artisan passport:install
    (it will be used for auth)
    - php artisan serve
  2) client
   - cd client
   - npm i
   - open env file in /client and change REACT_APP_CLIENT_ID and REACT_APP_CLIENT_SECRET
   - npm start

  3) go to 127.0.0.1:3000


I created this file structure with aim of further developing SPA application. That's why I included redux.
If you have already logged you haven't access to login page.
