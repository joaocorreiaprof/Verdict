console.log("CLIENT_ID:", process.env.CLIENT_ID);

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import prisma from "../prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return callback(
            new Error("No email found in Google profile"),
            undefined
          );
        }
        const username = profile.displayName.replace(/\s+/g, "").toLowerCase();

        // Procura usuário pelo email
        let user = await prisma.user.findUnique({ where: { email } });

        // Se não existir, cria
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              username,
              password: "",
              name: profile.displayName,
            },
          });
        }

        callback(null, user);
      } catch (err) {
        callback(err as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as any);
});
