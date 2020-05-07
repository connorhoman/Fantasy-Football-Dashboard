### USING THE FANTASY FOOTBALL DRAFT DASHBOARD 
Drag and drop players and tiers.  Double click to add to team, click to mark as selected, right click to star player.  Find/save rankings by username.

###DEVELOPMENT
Install Node via brew
Download MongoDB (enter mongo shell to confirm)
Use JSON data
mongoimport --jsonArray --db fantasy --collection players --file playerData.json
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

### Production Security Settings
SSH: anywhere
HTTP: anywhere
HTTPS: anywhere
Custom: 3000 anywhere

###Version Planning
 ##V0.0: MVP (June 2019)
    + Tiered Ranking 
    + User Data Persistence
    + Click-to-mark, right-click-to-star, double-click-to-select
 V1.0: 2019 Season (August 2019)
    - Team Depth Charts
    - In-Draft Team/Budget Trackers
 V2.0: 2020 Season (July 2020) 
    - Connect to ESPN API for data
    - Expert rankings
    - Current Player Card on click
    - Redo Repo?
 V3.0: 2021 Season (July 2021)
    - Connect to Live Draft
    - Monetize?


