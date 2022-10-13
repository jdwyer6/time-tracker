const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user._id }, "jwtsecretplschange");
    return accessToken;
};

module.exports = { createTokens };