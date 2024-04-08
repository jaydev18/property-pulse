import GoogleProvider from "next-auth/providers/google";

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
      //2. check if user exists
      //3. if not, then add user to database
      //4. return true to allow sign in
    },
    async session({ sessiion }) {
      //1. get user from database
      //2. Assign the usser id to the session
      //3. return session
    },
  },
};
