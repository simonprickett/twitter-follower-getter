# twitter-follower-getter

Google Cloud Function that returns the number of followers a given handle has, or -1 if it can't get them.  Example response:

```
{
    "followers": 1001
}
```

Example code to call this, using JavaScript `fetch` API:

```
var myHeaders = new Headers();
myHeaders.append("x-api-key", "<api key>");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://<cloud function url>/getFollowers?handle=<twitter handle>", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

Where:

* `<api key>` is the value of the `API_KEY` environment variable for your deployed funtion (see below).
* `<cloud function url>` is the Google Cloud URL for your deployed function.
* `<twitter handle>` is the Twitter handle you want to get the number of followers for, for example mine is `simon_prickett`.

When deploying to Google Cloud Functions, add the following environment variable:

* `API_KEY` - set to whatever value you want to use, then provide that value in the `x-api-key` header when calling the function.