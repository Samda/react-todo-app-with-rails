# React on Rails todo app with inline editing feature 

**assume that you got yarn and rails setup already.**

#### clone project to local machine  
`git clone git@github.com:Samda/react-todo-app-with-rails.git && cd react-todo-app-with-rails`

#### install all depencies for react and rails.
go to project directory and run  
`bundle && yarn install`

#### create db and add some sample data to project.  
`bundle exec rails db:setup && db:seed`

#### Start development server 
we are using [foreman](https://github.com/ddollar/foreman) here to manage multi processes because we need to run rails and webpack dev server at the sametime.  
we have the setup for foreman start in `./Profile`.  
`bundle exec foreman start`
