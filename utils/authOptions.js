import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invocked on success signin
    async signIn({ profile }) {
      //1.conntect to the database
      await connectDB();
      //2. check if user exists
      const userExist = await User.findOne({
        email: profile.email,
      });
      //3. if not, then add user to database
      if (!userExist) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow sign in
      return true;
    },
    async session({ session }) {
      //1. get user from database
      const user = await User.findOne({
        email: session.user.email,
      });
      console.log(user);
      //2. Assign the usser id to the session
      session.user.id = user._id.toString();
      //3. return session
      return session;
    },
  },
};
