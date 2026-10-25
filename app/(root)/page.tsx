import Header from "@/components/Header"
import TradingViewChart from "@/components/TradingViewWidget"


const Home = () => {
  return (
    <main>
      <div className="flex min-h-screen home-wrapper">
        
        <Header/>
        <TradingViewChart/>
      </div>
    </main>
  )
}

export default Home