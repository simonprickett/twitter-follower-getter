const cors = require('cors')();
const fetch = require('node-fetch');

const getFollowerCount = async twitterHandle => {
  try {
    const response = await fetch(`https://api.twitter.com/2/users/by?usernames=${twitterHandle}&user.fields=public_metrics`, {
        headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    const userData = await response.json();
    return userData.data[0].public_metrics.followers_count;
  } catch (e) {
    console.error(e);
    return -1;
  }
};

exports.getFollowers = async (req, res) => {
  cors(req, res, async () => {
    const apiKey = req.headers['x-api-key'];

    if (! apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).send('Not authorized.');
    }

    const twitterHandle = req.query.handle;

    if (! twitterHandle || twitterHandle.length === 0) {
      return res.status(400).send('Bad request.');
    }

    const numFollowers = await getFollowerCount(twitterHandle);

    return res.status(200).json({ followers: numFollowers });
  });
};
