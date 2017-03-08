### Purpose
The interviewers are interested in _non-coding_ aspects and how I solve this problems, so I create this note and it will record my thinking processes until I solve this issue.

#### Before Coding - 08 Mar 2017
##### Tool
It is a web development that need work on both server side and client side. After reviews the requirement, I choose __Node.js__ for server side. Because I have few experiences of Java/Python and no experiences of Scala/GO for the web development, mean while, my last web project is a node.js web applicaton and it gave me lots of experiences. Will use __Express__ framework.

Front-end will use __Bootstrap, JQuery, AJAX__ for client side operation like http requests. Will think about using __React.js__ as well. It depends on the free time.

Also, after reviews the requirement, there must have a database to store vote and some related objects. Because I will change the structure of objects in database during the implementation to improve the performance, as well as SQL is not good for mutable data structure. So I will use a __NoSQL__ database __MongoDB__.

So It will be __partial MEAN__ web application.

#### Some Queries
Well, I am a little confuse about the requirements. I am thinking the purpose of this challenge.
```
Is it to show my web development skill or the skill to solve big data?
```
##### If it is real voting Web application ?
* I won't let logged-in/known user to vote more then 3 times. We can have a __User__ database and to calculate the time of voting. If voting is more then 3 times. Then give a fail response to user.
So they won't have any invalid voting at all...

* We also can have a __Candidate__ database. Every valid vote will modify the candidate votes( + 1). So CountMeUp is just very quick http response. All it will do is looking for the candidates data in database and return 5 candidates and their votes.

* According to the above assumption, the response will be given very quickly. And the challenge won't be deal with big data. But solve the problem with a large number of HTTP post requests from users in a short time. Do not have too much ideas about this right now because there has no distribute systems design and I only allow to use single system.

* I will use RESTful api for get/post http requests. I think it is a free-style web application that I can define the user input form and get output result. The only requirement is get accurate votes results and display them in the website.

##### If it is a big data challenge?
* If it is a big data skill challenge, then it should only have one object __Vote__ which will include userID and candidateID in database. So the CountMeUp should iterate through a very large number of rows in a database and do the calculation in 1s.

* Well, I will think the input data format and type. The inputs votes are an array or from database? Are they JSON or XML? The inputs will be the whole votes data or input vote one by one?

* The more important is the how to design a good algorithm to get the best performance.

#### Estimate Final Project
According to the queries I have, I will give a web application that has both solution for a real application and big data challenge.
##### Server Side:

There has 3 Objects in my database:
 * __Vote__(userID, candidateID),
 * __User__(userID, maxVote, candidateOne, candidateTwo, candidateThree),
 * __Candidate__(votes, validVotes).

##### Client Side:
* User Input with 2 value - userID and candidateID
* Two getVote buttons - 1. Get votes from __Candidate__ Database (no calculation). 2. Get votes by iterating the __Vote__ database, do the calculation in 1s and give an response.
