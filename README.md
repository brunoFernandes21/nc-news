# Northcoders News

Northcoders News is the Frontend of a Full Stack Application. It is a social news aggregation, web content rating and discussion website.

## Live version 
https://bruno-fernandes.netlify.app

## Back end repo
https://github.com/brunoFernandes21/northcoders-news

## Project Description

Northcoders News has articles which are divided into topics, and each article has user-curated ratings from upvotes and downvotes using an API.
Users can view a list of all articles, or a list of selected articles by topics, also view a list of comments associated with an article.

The application also allows users to view an individual article, like it or dislike it, post a new comment to an existing article and delete their own comment/s. Users are not allow to delete other user's comments. In case there is an error, from the api or the client side, the users are informed with an error message. The application includes darkmode, mobile navigation and is fully responsive

The technologies I used to build this project includes React, Express, PSQL, Node, Css, Tailwind CSS.


In the future I hope to be able to implement user authentication to make the application complete. 


## How to Install and Run the Application

Minimum version of ```None``` required to run locally ```19.8.1```
1 - Clone the Repository to you local machine
```git clone <repo-url>```
2 - cd into the cloned folder
```cd <folder-name>```
3 - Run the following command to install all the required dependencies to run the project locally
```npm install```
4 - By running the following command, vite server should start on localhost:5173
```npm run dev```

## Example package.json

![Alt text](<src/assets/Screenshot 2023-07-22 at 20.57.45.png>)

## Brief description of the functionalities

When the application first load, you will be presented with a list of all the articles. You can view articles by topic by selecting a topic from the main navigation bar on the top of the page(desktop). If on mobile, click the white icon on the right hand side of the navigation bar to toggle mobile navigation. From there, you can select desired topic and it will show the articles associated with that topic.

From the home page or when views articles by topic, you can click on an article to read its content. When viewing an individual article you can like it, dislike it, leave a comment and delete your own comment/s. You can click the comments icon under the comment box to view  a list of all comments associated with that article.

To add a comment just enter your comment in the comment box and press post comment. You are not able to post an empty comment. 
Once you have posted your comment, if it is successful, you will see your comment under the comment's box and you can delete it if you wish. If successful, a green box with a successful message will pop up, if it is unsuccessful, you'll see a red box with an error message. 

After posting a comment, you can see a list of all the comments, including yours, by clicking the comments icon under your recent posted comment. You can also delete your comment/s from the list of comments, if successful, a green box with a successful message will pop up if unsuccessful a red box with an error message will pop up.

## Author

Bruno Fernandes

GitHub: https://github.com/brunoFernandes21

LinkedIn: https://linkedin.com/in/bruno-fernandes-879b0725a

## Support

If while using this application you run into any type of errors, please get in touch via GitHub or email brunoaf1523@gmail.com

## Acknowledgement 

I would like to say thank you to Northcorders for the opportunity they gave me to take the course and build this application as my Front End project. 