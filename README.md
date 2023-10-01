# Getting started with development

## Pre-requites
 - [Node.js](https://nodejs.org/en) (Download the LTS version as Current version contains experimental features that may contain bugs)
 - [MySQL](https://dev.mysql.com/downloads/installer/) ([INSTALL GUIDE](https://www.w3schools.com/mysql/mysql_install_windows.asp))
 - Terminal/CMD (or any shell console emulator i.e. hyper, tmux)
 - Code editor of your choice, VScode, NVIM etc.

## Setting up Dev environment
1. Fork the github repo. Go to [lnfel/google-sheets repo](https://github.com/lnfel/google-sheets) and click the `fork` button. This will create a copy of the project in your github repository.
2. Copy the git url of the forked repo then open up the terminal and `cd` in to your project folder. Finally clone the forked repo on your local machine.
```sh
# In this example I have my projects at C:/sites
# cd <PATH>
cd C:/sites

# Cloning the git url will create a copy of the repo inside google-sheets folder.
# git clone <GIT URL>
git clone https://github.com/<YOUR_GITHUB_USERNAME>/google-sheets.git

# Or change the folder to any name you want by adding a folder name after the git url.
# I recomment creating folder names without spaces when using Windows OS, it will prevent bugs from space file paths in windows, in this case I have a hypen as delimiter for my 2 word folder name.
# git clone <GIT URL> <FOLDER NAME>
git clone https://github.com/<YOUR_GITHUB_USERNAME>/google-sheets.git awesome-project
```
3. CD into the project.
```sh
cd google-sheets
# Or if you renamed the folder name
cd awesome-project
```
4. Install NPM dependencies (NPM comes with installing Nodejs be default).
```sh
npm install
# Or if your are using pnpm
pnpm install
```
5. Create mysql database. Make sure you have MySQL installed:
```sh
# Open mysql session (no password)
mysql -u root
# of if you have setup password for root user
# Enter the password after running the command below
mysql -u root -p

# Once you are inside mysql console, enter the following
CREATE DATABASE google_sheets;
# To confirm we have the database created, enter:
SHOW DATABASES;

# To exit mysql session
exit
```
6. Run prisma database migrations. This will populate the database tables of the recently created database on step 5.
```sh
# Using NPM, then confirm the prompt afterwards
npx prisma migrate dev --name init
# or with pnpm
pnpx prisma migrate dev --name init

# Running the above command(s) will also generate prisma client that is required for our code to run
# In cases that prisma client is not generate, we can manually generate it by running:
npx prisma generate
# or with pnpm
pnpx prisma generate
```
7. Create `.env` and `google_sheets_service_account_keys.json` file inside project's root directory. Contact me for what contents need to be inside those files. They are sensitive and cannot be included on public source code. 
8. Run the dev server.
```sh
# This will make our app available at http://localhost:5173
npm run dev
```

## Building

```sh
# Run build command
npm run build
# Run server using the build files, it will make the app available on http://localhost:4173
npm run preview
```

## Project milestones a.k.a. roadmap

### Backend logic
- [ ] User
  - [ ] Roles (User, Admin)
  - [ ] Permissions
    - [ ] User permissions
      - [ ] Create, read, update players (soft delete players?)
    - [ ] Admin permissions
      - [ ] Must be able to do what User does + soft delete and delete players
      - [ ] Must be able to manage all users i.e. create, read, update, soft delete and delete (CRUD)
- [ ] Player
  - [ ] Identify what player information to save, please ask client about this
  - [ ] Create, read, update, delete players
- [ ] History (these are logs of actions performed by employee and admin, this will be publicly available to both parties)

### Main app features
- [ ] Features
  - Store player's information on a local database
  - [ ] Take player's picture from webcam using [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos) and store it locally on disk
  - Upload player's info and images to cloud delivery network (CDN) (optional)
  - [ ] Import player info from excel file
  - [ ] Export player info from excel file
  - [ ] Generate player ID
    - [ ] Embed player's info to player ID using QR code using [mebjas/html5-qrcode](https://github.com/mebjas/html5-qrcode), used for verifying legitimacy of player ID
    - [ ] Print generated player ID
    - [ ] Send player their ID via email (optional)

### Frontend UI
- [ ] Dashboard
  - [ ] for User
  - [ ] for Admin
- [ ] Register and manage players

### Deployment
- [ ] Test deployment on windows
- [ ] Provision [Caddy server](https://caddyserver.com/)
