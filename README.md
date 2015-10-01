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

## Roadmap for version 0.0.1

- Error treatment for messages from server. 
- Paginate results using the *next* attribute of response from server.
- Add the all plugins in PLUGINSAVAILABLE. ![](http://cmsresources.windowsphone.com/windowsphone/lv-LV/How-to/wp7/inline/office-icon-done.png)
- Create a active plugin per consumer in API section.
- Add favicon and Jungle logo ![](http://cmsresources.windowsphone.com/windowsphone/lv-LV/How-to/wp7/inline/office-icon-done.png)
- Dockerfile ![](http://cmsresources.windowsphone.com/windowsphone/lv-LV/How-to/wp7/inline/office-icon-done.png)
- Write the tests ![](http://cmsresources.windowsphone.com/windowsphone/lv-LV/How-to/wp7/inline/office-icon-done.png)
- Add travis webhook ![](http://cmsresources.windowsphone.com/windowsphone/lv-LV/How-to/wp7/inline/office-icon-done.png)


## License

```
Copyright 2015 Jungle Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
