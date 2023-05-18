# Briefly 
## URL Shortner with an analysis 

#### A URL shortener is a tool that can be used to shorten long, complex URLs into shorter, more manageable links. This project is a simple URL shortener service, where users can input a long URL and get a shorter one in return and will also generate QR code for link and UPI.
## Tech Stacks Used:
- ### Frontend: 
  `HTML` `CSS` `JavaScript` `tailwind`
- ### Backend: 
  `Node.js` `Express.js` `MongoDB` `Redis` `google-oAuth` `github-oAuth`

## Tools Used:
 - ### IDE:
    `Visual Studio Code` 
 - ### External Package Manager: 
    `NPM` 
 - ### Deployment tools:
    `Netlify` `Cyclic` `Render`

## Frontend Deployed link:
- Client Side: [https://lacking-berry-1088.netlify.app/](https://lacking-berry-1088.netlify.app/)

## Backend Deployed Link
- Server Side: [https://beige-swordfish-wear.cyclic.app/](https://beige-swordfish-wear.cyclic.app/)

# User Flow Chart 
<img src="https://imagetolink.com/ib/hFyN6nFxCY.png" alt="hFyN6nFxCY"/>

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
      redis_password = < redispassword >
      GITHUB_CLIENT_ID = < github client id>
      GITHUB_CLIENT_SECRET = <github client secret>
      GOOGLE_CLIENT_ID = < google client id>
      GOOGLE_CLIENT_SECRET = <google client secret>
                                               
#### Start the server by running `npm run server`.
## Usage
  - To sign in or sign up with Google or GitHub, click the corresponding button on the login page and follow the prompts.
  - Once the server is running, you can use the URL shortener by entering a long URL in the input field on the dashboard and clicking the "Shrink" button. The application will generate a short URL that you can use to redirect to the original long URL.



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

## Admin Dashboard
- #### The admin dashboard provides a way to manage the users and links. From the dashboard, you can:
- View a list of all the users and links.
- Delete users.
- Delete links.
To access the admin dashboard, navigate to /admin in your web browser and enter the admin username and password that you specified in the .env file.

# Screenshots:
- ## Homepage
<img src="https://imagetolink.com/ib/0CD0W84znA.png" alt="0CD0W84znA"/>

- ## Login
<img src="https://imagetolink.com/ib/HUjc64bdAg.png" alt="HUjc64bdAg"/>
  
- ## Register
<img src="https://imagetolink.com/ib/p80Gpu8j2p.png" alt="p80Gpu8j2p"/>
  
- ## Client Dashboard
<img src="https://imagetolink.com/ib/FMBNFAMZww.png" alt="FMBNFAMZww"/>
  
- ## Admin
  
- - ### Admin Login
  <img src="https://imagetolink.com/ib/T5nxxX8VWE.png" alt="T5nxxX8VWE"/>
  
- - ### Admin Dashboard
  <img src="https://imagetolink.com/ib/QmklPB6gkw.png" alt="QmklPB6gkw"/>
  
- - ### User Manager
  <img src="https://imagetolink.com/ib/k5KMNKA2kj.png" alt="k5KMNKA2kj"/>

- # Authors

- Vaibhav Shevne :  [Linkedin](https://www.linkedin.com/in/vaibhav-shevne-1b1935170/) - [Github](https://github.com/vaibhzz101/)
- Vipul Kumar :  [Linkedin](https://www.linkedin.com/in/vipul-kumar-931a021b8) - [Github](https://github.com/vaibhzz101/)
- Akash Manwar :  [Linkedin](https://www.linkedin.com/in/akash-manwar-574277248/) - [Github](https://github.com/AkashManwar2506)
- Saloni Kumari :  [Linkedin](https://www.linkedin.com/in/saloni0021/) - [Github](https://github.com/Saloni0282)
- Rohit Kumar :  [Linkedin](https://www.linkedin.com/in/rohit-kumar824/) - [Github](https://github.com/rohitsingh1816/)


