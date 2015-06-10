# JUNGLE
[![Build Status](https://travis-ci.org/rsdevigo/jungle.svg?branch=master)](https://travis-ci.org/rsdevigo/jungle)

![](https://i.imgur.com/MuFFweF.png)

GUI to [KONG](http://getkong.org).

## Prerequisites
- Nodejs
- Npm
- Grunt
- Bower

## Install dependencies
```
$ [sudo] npm install
$ bower install
```

## Configure the Kong url
In ./modules/core/config/core.client.constants.js change the KONGURL.

## Build & development

- Run `grunt` for building and `grunt serve` for preview.

- Open the address http://localhost:3000

## Testing

Running `grunt test` will run the unit tests with karma.

## Roadmap

- Error treatment for messages from server.
- Paginate results using the *next* attribute of response from server.
- Add the all plugins in PLUGINSAVAILABLE.
- Create a active plugin per consumer in API section.
- Add favicon and Jungle logo
- Dockerfile
- Write the tests
- Add travis webhook

