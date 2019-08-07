###DEVELOPMENT
npm install
npm run react-dev
npm run server-dev

###API
#GET
/players

#GET
/rankings/user
#POST
/rankings

###Data
Convert CSV data to JSON
mongoimport --jsonArray --db fantasy --collection players --file playerData.json

### Production
https://medium.com/@rksmith369/how-to-deploy-mern-stack-app-on-aws-ec2-with-ssl-nginx-the-right-way-e76c1a8cd6c6
SSH: anywhere
HTTP: anywhere
HTTPS: anywhere
sudo ssh -i draft.pem ubuntu@172.31.40.250
sudo su

###Version Planning
 #V0.0: MVP (June 2019)
    + Tiered Ranking 
    + User Data Persistence
    + Click-to-mark, right-click-to-star, double-click-to-select
 V1.0: 2019 Season (August 2019)
    - Team Depth Charts
    - Draft Budget Tracker
    - Historical League Data
 V2.0: 2020 Season (July 2020) 
    - Connect to ESPN API for data
    - Expert rankings
    - Current Player Card on click
    - Redo Repo?
 V3.0: 2021 Season (July 2021)
    - Connect to Live Draft
    - Monetize?