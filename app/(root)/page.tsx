import Header from "@/components/Header"
import TradingViewChart from "@/components/TradingViewWidget"
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";


const Home = async () => {

  const session = await auth.api.getSession({
    headers : await headers()
  }) ;
  
 if(!session?.user) {
    redirect('/sign-in')
  };

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,  
  };



  return (
    <main>
      <div className="flex min-h-screen home-wrapper">
        
        <Header user={user}/>
        <TradingViewChart/>
      </div>
    </main>
  )
}

export default Home