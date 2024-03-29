# Bedrock Table of Contents
- [Website-link](#website-link)
- [Features](#features)
- [Tech-Used](#tech-used)
- [Contant](#contact)


## Description
Bedrock is a social media music site. Curated for artists to have their own commuinty timeline, allowing users to only see the posts of the respected community.

## Tech used

### Frameworks, Platforms and Libraries:
<p float="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
</p>

### Database:
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" style="width:75px;" />

### Other:
<p float="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:75px;" />
<img src="https://partner.zoom.us/wp-content/uploads/2022/12/2022_Zoom-AWS_Lockup_RGB-1-e1672857797889-1024x760.png" style="width:75px;" />
</p>

<br>


## Features

- Users can create Artist accounts if they want to post albums on the site and have more curated functionality

- Artist accounts have their own community page for Users on the site to interact with each other

- An Artist on the platform can post albums on the site
- Users can see the album and its details on the Artist's page

- Users can follow artists to be subscribed to them and their community
- Once a User is subscribed to an Artist, they have access to the artist's community page as in they can post, comment, like or view

- Users can make posts on community boards or comment on any posts


## Installation

   ### 1. Clone the repository
      ```sh
      git clone git@github.com:SejuSpeaks/Bedrock.git

      ```
   ### 2. Install npm dependencies
      ```sh
      cd react-app/
      npm install
      ```
### 3. Install pip depensencies
    ```sh
    cd app/
    pipenv i
    ```
   ### 3. On the root directory Copy the environment variables to .env and change the values
      ``` sh
      cp .env.example .env
      ```
   ### 4. Initialize the database
      ``` sh
      cd app/
      pipenv shell
      flask db upgrade
      flask seed all
      flask run
      ```
   ### 5. Run the frontend server
      ```sh
      npm start
      ```
   ### 6. Open the app in your browser

      Visit http://localhost:3000 in your browser.

<br>

![Landing Page](https://github.com/SejuSpeaks/Bedrock/assets/80376392/c1851b4d-4241-458e-9866-e6b3f835b3f0)


## Website Link
[Link to Site](https://bedrock.onrender.com/)

## Contact
 [LinkedIn](www.linkedin.com/in/elvis-bueno-1b943325a)
