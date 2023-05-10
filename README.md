# Briefly 
## URL Shortner with an analysis 

#### A URL shortener is a tool that can be used to shorten long, complex URLs into shorter, more manageable links. This project is a simple URL shortener service, where users can input a long URL and get a shorter one in return..
## Tech Stacks Used:
- ### Frontend: 
  `HTML` `CSS` `JavaScript` `tailwind`
- ### Backend: 
  `Node.js` `Express.js` `MongoDB` `Redis` `google-auth`

## Tools Used:
 - ### IDE:
    `Visual Studio Code` 
 - ### External Package Manager: 
    `NPM` 
 - ### Deployment tools:
    `Netlify` `Cyclic`

## Frontend Deployed link:
- Client Side: [https://lacking-berry-1088.netlify.app/](https://lacking-berry-1088.netlify.app/)

## Backend Deployed Link
- Server Side: [https://beige-swordfish-wear.cyclic.app/](https://beige-swordfish-wear.cyclic.app/)

## Installation
 ### To install this project, follow these steps:

- #### Clone this repository to your local machine.
- #### Install the required dependencies by running npm install.
- #### set up a MongoDB database either locally or using a cloud provider like MongoDB Atlas.
- #### Create a .env file in the root directory and add the following variables: 
      PORT=<your_preferred_port>
      MONGODB_URI=<your_mongodb_uri>
      normalkey = <normalkey>
      refreshkey = <refreshkey>
      redis_password= <redispassword>
      GITHUB_CLIENT_ID=< GITHUB_CLIENT_ID>
      GITHUB_CLIENT_SECRET=<GITHUB_CLIENT_SECRET>
      GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
      GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRE>
                                               
#### Start the server by running `npm run server`.
## Usage
- Once the server is running, you can use the URL shortener by entering a long URL in the input field on the homepage and clicking the "Shorten" button. The application will generate a short URL that you can use to redirect to the original long URL.

- To sign in or sign up with Google or GitHub, click the corresponding button on the login page and follow the prompts.

- To access the admin dashboard, navigate to /admin in your web browser and enter the admin username and password that you specified in the .env file. From the dashboard, you can view a list of all the users and links, delete users, and delete links.

## API Documentation
POST ```/url/shorturl```
Shortens a long URL and returns the shortened URL.

   Request Body
   ```json
   {
    "longUrl": "string"
    }

```
response

- `longUrl` (string, required): The long URL to shorten.
Response
```json

{
    "shortUrl": "string"
}
```
- `shortUrl` (string): The shortened URL.

## Analysis
-  One of the key challenges in building a URL shortener is generating unique, short URLs that are easy to remember and type. In this implementation, we are using a combination of Redis and MongoDB to generate short URLs.

- Another important consideration is security. By implementing authentication with Google OAuth and GitHub OAuth, we can ensure that only authorized users are able to access the application. Additionally, we have implemented input validation and sanitization to protect against malicious inputs.

- To improve performance and scalability, we are using Redis to cache frequently accessed data and MongoDB to store less frequently accessed data. We can also implement load balancing to handle a large number of requests.

# Admin Dashboard
- #### The admin dashboard provides a way to manage the users and links. From the dashboard, you can:
- View a list of all the users and links.
- Delete users.
- Delete links.
To access the admin dashboard, navigate to /admin in your web browser and enter the admin username and password that you specified in the .env file.

Credits
This project was created by [your name here].



## Screenshots:
- ### Homepage
<img src="https://imagetolink.com/ib/vlPfm02K35.png" alt="vlPfm02K35"/>

- ### Login
<img src="https://imagetolink.com/ib/yFkOTIrpwR.png" alt="yFkOTIrpwR"/>
  
- ### Register

- ### Client Dashboard

- ### Admin Dashboard

- ## Authors

- Vaibhav Shevne :  [Linkedin](https://www.linkedin.com/in/vaibhav-shevne-1b1935170/) - [Github](https://github.com/vaibhzz101/)
- Vipul Kumar :  [Linkedin](https://www.linkedin.com/in/vipul-kumar-931a021b8) - [Github](https://github.com/vaibhzz101/)
- Akash Manwar :  [Linkedin](https://www.linkedin.com/in/akash-manwar-574277248/) - [Github](https://github.com/AkashManwar2506)
- Saloni Kumari :  [Linkedin](https://www.linkedin.com/in/saloni0021/) - [Github](https://github.com/Saloni0282)
- Rohit Kumar :  [Linkedin](https://www.linkedin.com/in/rohit-kumar824/) - [Github](https://github.com/rohitsingh1816/)


