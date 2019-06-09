# The Http Client for GalaxyCrowd Fund

## Feature

1. Promise base http client
2. Set Json as default format
3. Log `request` and `response` information


## How to use

```js
import symm from 'csf-symmetra';

try {
  const responseJson = await symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  });
  console.log(responseJson);
} catch (error) {
  console.log(error);
}
```

OR

```js
import symm from 'csf-symmetra';

symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (responseJson) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Set up custom http client

```js
const customSymm = symm.create({
  headers: {
    'Authorize': 'xxxxx',
  },
  baseURL: 'http://baseurl.com',
});
```

## Get full response

```js
try {
  const response = await symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }, {
    full: true,
  });
  console.log(response);
} catch (error) {
  console.log(error);
}
```

## Hide request and response params in log

```js
try {
  const response = await symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }, {
    logParams: false,
  });
  console.log(response);
} catch (error) {
  console.log(error);
}
```

## error object
```js
{
  message,
  status,
  data
}
```
