const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  const token = jwt.sign({ id, email, fullname, bio }, secret);
  return token;
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      try {
        const hashedPassword = await bcrypt.hash(args.user.password, 10);

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return user.id;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        const valid = await bcrypt.compare(args.user.password, user.password);
        if (!valid || !user) throw 'User was not found.';

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });
        return user.id;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
