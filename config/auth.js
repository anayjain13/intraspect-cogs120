module.exports = {

    'facebookAuth' : {
        'clientID'      : '146869599328588', // your App ID
        'clientSecret'  : 'df17d188015dd6b91f3b4f73906b89e2', // your App Secret
        'callbackURL'   : 'https://a9-intraspect.herokuapp.com/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};