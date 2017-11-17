# MyCRM Client

Poc for myCRM - Trip Sorter.

This app provide a `mobile-app` and `desktop-app` for an adaptive approach, the web server will be responsible to deliver the right bundle.
This will enable more flexibility and performance improvenemt on the long run, enabling team development to deliver code only on the needed platform. (example: google maps only on the desktop-app) 


## General Implementation
The app 'fetch' all the deals from the server all in once then build 2 weighted graph based on price(discounted) and time(minutes).

The 2 graphs are available in the store and consumed everytime  user perfom a search.
Complexity is equals to O(|E| + |V| Log|V|) where E are the edges and V the nodes.


Results are deeplinked, means you copy and share the results with others. 


## Development server
`yarn start:mobile`
`yarn start:dektop`

## Build
`yarn build:mobile`

`yarn build:dektop`

## Bundle analyzer
`yarn analyze:mobile`

`yarn analyze:dektop`

## Coding Standards & Techniques
Reposity is set up with:
- `commitizen` for standard command messages 
- `tslint` for standard command messages 
- centralized rxjs imports
- Error warning for unsed imports that would increase biundle size
- ngRx as state managments
- Side effects have to pass from effects classes
- Routes lazy loaded

## TODO
- UTs
- e2e Tests
- Server Side Rendering for page load improvements
- Service Worker for Progressive Web Apps
- Move Shortest path computation on server side
- Introduce Graphql to improve page speed and fetch less data
