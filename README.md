# salla-test-task
## This is a test task for Serhii Bryt.
### This task is made with a help of Playwright and Typescript
### Project structure: 
- fixture - here all fixtures are stored
- pages - all page objects are here. Also, there is `Application` class where all page objects are stored.
Also, there is `ArtworkModel` class to store date about artwork item.
- files - here all files for upload action are stored
- tests - tests are stored here
### Preparations:
First clone the repo   
```commandline
git clone https://github.com/britka/salla-test-task.git
```
then  
```commandline
cd salla-test-task
```

To run tests you need to create file `.env` at the root of project.  
To reach this you may use `.env.example` file.

>[!WARNING]
> All needed software should be installed: nodejs, playwright etc.

### How to run:
Run by default. By default, tests will run in 3 browsers. Chromium, firefox, webkit in multithread.
```commandline
npx playwright test tests 
```
To run tests for appropriate browser, you should do something like this
```commandline
npx playwright test tests --progect=firefox
```
this will run test for `firefox` browser in multithread   

>[!NOTE] 
> FRom time to time tests on webkit are failed on the login page.
