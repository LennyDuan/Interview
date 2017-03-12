### Day 1 - 08 Mar 2017 21:00 -
#### Init Voting Project
Staring coding for the application. I have a node.js project before, so what I have done is reuse web structure of that project for the new Voting web application.

Delete, modify, cleanCode and something like this.

Show 'Hello World' in website.

##### Problem - failed to lookup view
* __Problem__: I face a problem when I try to run my new project for the first time: _Error_: Failed to lookup view "/pages/info" in views directory "/Users/Lenny/Desktop/Interview/BBC/voting/views"_
* __Process__: ...still search the solution via Google. I think it is just a typo error or some stupid mistake. But I can't find out...must solve it today.
* __Solution__: in controller/v1/info.js file, remove '/' before '/pages/info' res.render('pages/info'). I know it must be a typo error...

#### Create Data Model Schema and Create Model test
I will always create __Model Test__ for the models in database, I have finish the data models for __Vote__, __User__, __Candidate__. Finish models tests or leave it to tomorrow.

Have finish model test:
  * Candidate Model should be able to save a user to the db: 22ms
  * Candidate Model should not be able to save a non-candidateID User to the db: 2ms
  * User Model should be able to save a user to the db: 3ms
  * User Model should not be able to save a non-userID User to the db: 2ms
  * User Model should not be able to save a maxVote-lagger-than-3 User to the db: 0ms
  * Vote Model should be able to save a vote to the db: 2ms
  * Vote Model should not be able to save a non-userID vote to the db: 1ms
  * Vote Model should not be able to save a non-candidateID vote to the db: 1ms

###### __8 passing (80ms)__

### Day 2 - 09 Mar 2017 19:00 -
#### voting API
Before start the api design and test, I make more models tests and make sure the database can follow the rules I create.

Have finish 3 more model test:
* Candidate Model should not be able to save same candidateID Candidate to the
* User Model should not be able to save same userID User to the db: 2ms
* Vote Model should be able to save same vote to the db: 2ms

I like TDD development so I can know what I have done and is correct. So the first step is to create API test.

The project is not big but I design a structure for my application. __models__ folder to pull the model schema. __api/v1__ dir has the api path. __proxy__ dir handle the DB operation from http request through api. For me, GET api is the easiest to create and test. So I create a GET votes api Test to verify my api structure that can works fine.

##### Problem - Call Back && Multi Save
* __Problem__: In my original thought, I think when user post a vote, Vote will save a vote, User will save candidate and maxVote, Candidate will add one more vote. When I try to implement it. I find it is very complex when they are lots of call back. Even I use Promise to solve callback, I still need to find out how to manager these operations.
* __Process__: I think the most important part is dig Promise and see how it handles multi callback. Have tried some implementation but it doesn't work well. Keep trying.
* __Thought__ : Do I really need to use callback to save multi data for different object? Users dont' need to know the valid/invalid vote result in this requirement. Can we update User/Candidate database without callback?  
* __Solution__: Might find out tonight.

Create required API - POST vote & GET candidates/
Create API Test to test behaviour as well:
* /api/v1/voting/candidates/ GET should list and return all votes: 62ms
* /api/v1/votes/ GET should list and return all votes: 15ms
* /api/v1/votes/ POST should create a vote for a new vote and return 201: 24ms
* /api/v1/votes/ POST should not create a vote for an invalid vote and return 400: 6ms

### Day 3 - 10 Mar 2017 21:00 -
#### Finish Basic Data Proxy with Test
The first is to finish the problem - call back and multi save. Look some documents about call-back and Promise. I have some idea about how to design this part better. Before implementation, I will make some TDD tests first for basic data proxy.

Basic DB Proxy Test:
* Candidate Model Proxy createCandidate should create a new candidate with 1 vote: 2ms
* Candidate Model Proxy updateVoteCandidate should increase 1 for votes number: 10ms
* Candidate Model Proxy updateValideVoteCandidate should increase 1 for valid votes number: 3ms
* User Model Proxy findUser should return one user if find a user: 11ms
* User Model Proxy createUser should create a new user with 1 maxVote and one candidate: 2ms
* User Model Proxy validVote should return false if maxVote is equal/larger then 3: 3ms
* User Model Proxy validVote should return true if maxVote is less then 3: 4ms
* User Model Proxy updateUser should add second candidate if maxVote equal 1: 5ms
* User Model Proxy updateUser should add third candidate if maxVote equal 2: 7ms
* Vote Model Proxy updateCandidate should save a new candidate if can not find candidateID: 3ms
* Vote Model Proxy updateCandidate should return one more vote when find candidateID: 15ms

#### Implement Post voting API with multi-save correctly
I have to say the TDD is so powerful and so suitable for web development when It need deal with lots of call-back and Promise in one API. It helps a lot to correct my code.

Have same issue about multi save. I thought the code should be ok but test failed... Will solve it tomorrow.... I spent lots of time to solve this issue but the solution is __fix the typo__... I know when you can not find the reason and if you think your design is correct, it always be the typo issue!!!!!!!

### Day 4 - 11 Mar 2017 9:30 -
#### Implement Post voting API with multi-save correctly
I am still working on the part as there is a typo bug and block a whole night... I have to say the TDD is so great... Because the database proxy I design is from simple to complex. It helps me a lot to find the problem or wrong design in complicated DB operation proxy. Do no have too much detail.... Most of the job is create Test -> design -> implementation -> test ->modification -> pass. Lots of typo or wrong use of promise. And I should finished proxy and API I need before I move to UI design.

##### Problem - '/api/v1/votes/ POST should create a vote for update user and candidate with validVote and return 201' failed because it won't add valideVote
* __Problem__: In my original thought, when there is a new vote, it will update user then update candidate.But if user already have 2 maxVote, it will update maxVote to 3, and then when it update candidate, candidate check updated user first and it will consider it as a invalid user (update user before to 3), so it won't update validVote for candidate.
* __Process__: Well, my I modify the model, modify the user proxy, modify the vote proxy but I find the logic is not easy to handle. And it makes more test fail...I wanna solve it in another branch with this issue.  
* __Thought__ : I think a better design can save lots of time. Answer is just in the corner.
* __Solution__: Just update Candidate first, then update user. I have good design so it save lots of time to make this change.

Complicated Voting DB Proxy Test:
* Voting Proxy For modifyUser:  modifyUser should return a new user when cant find this userID: 10ms

* Voting Proxy For modifyUser:  modifyUser should update user with new candidate: 8ms
* Voting Proxy For modifyCandidate:  modifyCandidate should create a new candidate: 11ms
* Voting Proxy For modifyCandidate:  modifyCandidate should add vote and validVote for a valid user: 11ms
* Voting Proxy For modifyCandidate:  modifyCandidate should add vote without validVote for invalid user (maxVote >= 3): 10ms
* Voting Proxy For multiSave:  multiSave should return a new user and a new candidate for a Vote: 18ms
* /api/v1/votes/ POST should create a vote for a new vote with new user and candidate then return 201: 34ms
* /api/v1/votes/ POST should create a vote for update user and candidate with validVote and return 201: 31ms
* /api/v1/votes/ POST should create a vote for update invalid user and candidate without validVote and return 201: 24ms

#### Simple responsive UI Design
Start the front-end UI design. It will be Use node __ejs__ view engine with JQuery/Bootstraps/Ajax framework. Nothing too much to talk about. There will have 2 main folder for UI.
1. __Public__ : Some js/css I created for better display.
2. __Views__ : ejs files for creating html. __Partials__ folder includes some needed components to reduce duplicated code. __Pages__ directory has two main pages, one is index.ejs('/voting/') page for front-end design test. Second one is main.ejs('/voting/main') page. This page is for votes created by users and get candidate result(countMeUp).

Won't have too much problem. Most of the issue are typo mistake. Website debug tools in Chrome and FireFox have their own advantages and they help a lot to fix the front-end issue.
* Chrome: Better to find the syntax errors in JS files
* FireFox: Better to debug Restful http request.

Have finished the static _index_ page and dynamic AJAX RestRequest pages.
I will improve a better UI and then start the algorithms.

### Day 5 - 12 Mar 2017 9:30 -
Today is the last day, and I will start working on the big data algorithm. Before start it... I nned to create large number of data. I user gulp script to create two task 'createVotes' and test 'bigData'. I should find a proper way to create data.
