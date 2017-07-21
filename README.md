# React on Rails todo app with inline editing feature 

**assume that you got yarn and rails setup already.**

#### clone project to local machine  
`git clone git@github.com:Samda/react-todo-app-with-rails.git`

#### install all depencies for react and rails.
go to project directory and run  
`bundle && yarn install`

#### create db and add some sample data to project.  
`rails db:setup`

#### Start development server 
we are using foreman here to manage multip process because need to run webpacker
`bundle exec foreman start`
