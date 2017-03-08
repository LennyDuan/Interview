### Day 1 - 08 Mar 2017 20:00
#### Init Voting Project
Staring coding for the application. I have a node.js project before, so what I have done is reuse web structure of that project for the new Voting web application.

Delete, modify, cleanCode and something like this.

Show 'Hello World' in website.

##### Problem - failed to lookup view
* __Problem__: I face a problem when I try to run my new project for the first time: _Error_: Failed to lookup view "/pages/info" in views directory "/Users/Lenny/Desktop/Interview/BBC/voting/views"_
* __Process__: ...still search the solution via Google. I think it is just a typo error or some stupid mistake. But I can't find out...must solve it today.
* __Solution__: in controller/v1/info.js file, remove '/' before '/pages/info' res.render('pages/info'). I know it must be a typo error...

#### Create Data Model Schema and Create Model test
I will always create __Model Test__ for the models in database, I have finish the data models for __Vote__, __User__, __Candidate__. Will try to finish models tests or leave it to tomorrow.
