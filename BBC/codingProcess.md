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
* __Solution__: Might find out tonight.

Create required API - POST vote & GET candidates/
Create API Test to test behaviour as well:
* /api/v1/voting/candidates/ GET should list and return all votes: 62ms
* /api/v1/votes/ GET should list and return all votes: 15ms
* /api/v1/votes/ POST should create a vote for a new vote and return 201: 24ms
* /api/v1/votes/ POST should not create a vote for an invalid vote and return 400: 6ms
