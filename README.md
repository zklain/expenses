# Expenses

[SEE LIVE](https://expenses.klainz.dev)

A PWA with full offline support for your expenses.
You can save it to your homescreen and use it daily to track all your :beer:  and
:coffee: expenses.

So for the layout is only suited for mobile screen (soon to be cahnged).

If you clone the repo and run the app localy, the database will be seeded with
fake data.  

## Story

This project is a sort of playground which I created to learn and experiment 
with PWA development.


## Tech

### APP
The client app  started as a `create-react-app` with Typescript.
The offline database is implemented using [RxDb](https://rxdb.info/). 
I'm using [visx](https://airbnb.io/visx) for the graphs and
[react-spring](https://www.react-spring.io/) for the animations.

Styling is done with juicy [Theme UI](https://https://theme-ui.com/).


## TODO:

- [ ] Expenses aggregations collection for statistics
- [ ]  custom categories
- [ ] account support with sync, backup
- [ ] animations
- [ ] desktop support 
