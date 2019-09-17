# ui
<<<<<<< HEAD

=======
>>>>>>> 0678cab6d5b50bc110bbb43fc54fd4eef1d371a8
To use cookies you need to change the domain of the page because browsers don't usually store cookies from a locally hosted server. To trick the browser we need to add two dots to the domain as in ```geek.localhost.com```
To do this, we must change the file ```etc/hosts``` I used vim to do it.
```$ sudo vim //etc/hosts```

In the file you need to add
```
127.0.0.1 geek.localhost.com
```
Then you need to set the envrionment variable HOST equal to the domain that we specified. Go to the ui folder and find the file package.json

Then go to the line containing "start": "react-scripts start", and add HOST=geek.localhost.com
```
{
  "name": "geektext",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "bootstrap": "^4.1.3",
    "react": "^16.5.2",
    "react-dom": "^16.5.2",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "HOST=geek.localhost.com react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

<<<<<<< HEAD
=======
```
npm install --save lodash
```
>>>>>>> 0678cab6d5b50bc110bbb43fc54fd4eef1d371a8

Sources:

https://github.com/facebook/create-react-app/issues/2954
https://stackoverflow.com/questions/1134290/cookies-on-localhost-with-explicit-domain
https://stackoverflow.com/questions/489369/can-i-use-localhost-as-the-domain-when-setting-an-http-cookie/489396
<<<<<<< HEAD
=======


>>>>>>> 0678cab6d5b50bc110bbb43fc54fd4eef1d371a8
