# Website

Developed by Vikram Manikantan & ChatGPT-5 (a lot of it). 


## Adding yourself to the website:
1. Add to the ```Members``` or ```pastMembers``` list in ```data.js```
   a. Copy and paste someone elses and then fill out the fields as you would like.
2. Add your image ```img/members/firstname.jpg```

## Running Locally

The website will open locally (open index.html). But the dynamic publications list will not render in that way.

## Render Up to date Publications List

### Create publications.json
1. Set the ```ADS_API_TOKEN``` in your environment
2. Run the python script ```fetch_publications.py```

### 
1. Set-up a python host: ```python3 -m http.server 5500```
2. Open the local host at ```http://localhost:5500/```
