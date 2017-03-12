## Summary - Count Me Up
### Setup the project and run
1. Make sure you have installed __Node.js__ and __MongoDB__
*  Clone the BBC project from GitHub: https://github.com/LennyDuan/Interview
*  Go to __voting__ directory.
  * Install __Express__, run command line: _npm install -g express_
  * Install other modules, run command line: _npm install_
*  Start __MongoDB__ service
*  Check TDD Test results, run command line: _gulp test_
*  Start __Node__ service: run command line, __nodemon__
*  Check index pages: http://localhost:3000/voting/
*  Check main pages: http://localhost:3000/voting/main

### Development Summary
##### Basic Idea:
The requirement is to filter the valid votes result. My solution is to solve this issue at the beginning.

##### Computing Mechanism
1. User can votes as many as they want via POST API.

2. When a POST request with _userId_ and _candidateID_ has been received, my application will update/create User and Candidate object. Every votes will increase one _maxVote_ in User object. If the _maxVote_ is larger than 3, then this vote will be regarded as invalid vote. Every votes will increase _vote_ in Candidate object by 1. But valid vote will increase _validVote_ as well.

3. Count Me Up will send GET HTTP request to get all candidates data in Candidate database. Then the Javascript methods in client-side will give a final ranking.

##### Database Models:

* __Vote__: { userID: Number, candidateID: String }
* __User__: { userID : Number, maxVote : Number, candidateOne : String, candidateTwo : String, candidateThree : String };
* __Candidate__: { candidateID : String, vote : Number, validVote : Number }

##### APIs
* POST a vote with _userID_ and _candidateID_ params: /api/v1/voting/votes/
* GET candidate result: /api/v1/voting/candidates/

##### Views
* Home Index: http://localhost:3000/voting/
  * screenshot: BBC/Index Page.png
* Main Page: http://localhost:3000/voting/main
  * screenshot: BBC/Main Page Guide
  * screenshot: BBC/Vote
  * screenshot: BBC/Candidate Ranking

##### Explanation
I am sorry I can't understand the requirements and I don't think what I did will meet the demands.
```
But I implemented a real voting web application
```
My first thought is that the challenge is __website development challenge__ which can let user votes and calculate valid candidate result. Then I think why you required 1 second for get result? So It should be a __big data challenge__ that want to see how can I handle big data problems. On Sunday, I thought why we need candidate percentages to get the result? So I change to a __pure algorithm challenge__ later. Then I found that the condition provided can't solve it at all. I am confused about the requirements and I don't remain any time. So I stop coding.

```
Document in BBC/thinkingProcess have more the details
```

##### Document
* __doc__: Original challenge requirements and Technical questions.
* __thingProcess__: non-coding aspects my thoughts, queries and ideas about this problems
* __codingProcess__: record the steps to implement this project and questions I have.
* __voting__: main project code
  * api: handle RESTful HTTP request
  * controller: render view pages
  * middlewares: handle error
  * models: MongoDB data Schema
  * proxy: database operation
  * public: JS and CSS file
  * test: all test cases
  * views: ejs engine file to create HTML.


##### Finally
A great TDD coding experiences and it gives deeper understanding of MEAN web application. I Build a good and extendable voting foundation for a real web server in a short time.
