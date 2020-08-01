const cheerio = require('cheerio');
const cors = require('cors')();
const fetch = require('node-fetch');

const getFollowerCount = async twitterHandle => {
  try {
    const response = await fetch(`https://mobile.twitter.com/${twitterHandle}`);
    const pageText = await response.text();

    const $ = cheerio.load(pageText);

    // Need to get case sensitive screen name so we can find the 
    // followers link.
    const actualScreenName = $('.screen-name').text();
    const followersLink = $(`a[href='/${actualScreenName}/followers']`);
    const followersElem = followersLink.children('.statnum');
    const followersStr = followersElem[0].firstChild.data;

    return parseInt(followersStr.split(',').join(''), 10);
  } catch (e) {
    console.error(e);
    return -1;
  }
};

exports.getFollowers = async (req, res) => {
  cors(req, res, async () => {
    const twitterHandle = req.query.handle;

    if (! twitterHandle || twitterHandle.length === 0) {
      return res.status(400).send('Bad Request.');
    }

    const numFollowers = await getFollowerCount(twitterHandle);

    return res.status(200).json({ followers: numFollowers });
  });
};
