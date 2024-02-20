import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/verify',
    newUser: '/register',

  },
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if(isOnDashboard) {
            if (isLoggedIn) {
                return true
            };
            return false;
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl))
        }
        return true;
        
    },
    async session({session, user}) {
        session.user = user;
        return session;
    },
    async jwt({token, user}) {
        if (user) {
            token.id = user.id;
            token.email = user.email;
        }
        return token;
    },
    
  },
  providers: []
} satisfies NextAuthConfig;