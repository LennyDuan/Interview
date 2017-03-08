### Day 1 - 08 Mar 2017
Staring coding for the application. I have a node.js project before, so what I have done is reuse web structure of that project for the new Voting web application.

Delete, modify, cleanCode and something like this.

##### Problem One - failed to lookup view
* Problem: I face a problem when I try to run my new project for the first time: _Error: Failed to lookup view "/pages/info" in views directory "/Users/Lenny/Desktop/Interview/BBC/voting/views"_
* Process: ...still search the solution via Google. I think it is just a typo error or some stupid mistake. But I can't find out...must solve it today.
* Solution: in controller/v1/info.js file, remove '/' before '/pages/info' res.render('pages/info'). I know it must be a typo error...
