
import ReusableWidgetComponent from "@/components/ReusableWidgetComponent";

export default function Page() {
  return (
    <div className="w-full space-y-10 px-4 py-8 sm:px-6 lg:px-8">

      {/* SECTION 1: Market Overview + Stock Heatmap */}
      <main className="grid grid-cols-1 gap-6 rounded-2xl border border-cyan-300 p-4 shadow-[0_0_18px_rgba(103,232,249,0.35)] sm:p-6 lg:grid-cols-3">

        {/* Market Overview — 1/3 width */}
        <section className="min-w-0 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-cyan-300">
            Market Overview
          </h2>

          <ReusableWidgetComponent
            scriptUrl="https://widgets.tradingview-widget.com/w/en/tv-market-overview.js"
            elementName="tv-market-overview"
            attributes={{
              theme: "dark",
            }}
            className="h-[600px] w-full overflow-hidden rounded-xl"
          />
        </section>

        {/* Stock Heatmap — 2/3 width */}
        <section className="min-w-0 lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-cyan-300">
            Stock Heatmap
          </h2>

          <ReusableWidgetComponent
            scriptUrl="https://widgets.tradingview-widget.com/w/en/tv-heatmap.js"
            elementName="tv-heatmap"
            attributes={{
              "heatmap-type": "stock",
              "data-source": "SPX500",
              grouping: "sector",
              "block-size": "market_cap_basic",
              "block-color": "change",
              theme: "dark",
            }}
            className="h-[600px] w-full overflow-hidden rounded-xl"
          />
        </section>
      </main>

      {/* SECTION 2: Top Stories + Market Data */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Top Stories — 1/3 width */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-9 w-1.5 rounded-full bg-cyan-400" />

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Latest Updates
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Top Stories
              </h2>
            </div>
          </div>

          <ReusableWidgetComponent
            scriptUrl="https://widgets.tradingview-widget.com/w/en/tv-news-feed.js"
            elementName="tv-news-feed"
            attributes={{
              theme: "dark",
            }}
            className="h-[750px] w-full overflow-hidden rounded-xl"
          />
        </div>

        {/* Market Data — 2/3 width */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-7 lg:col-span-2">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Global Markets
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Market Data
            </h2>
          </div>

          <ReusableWidgetComponent
            scriptUrl="https://widgets.tradingview-widget.com/w/en/tv-market-data.js"
            elementName="tv-market-data"
            attributes={{
              "symbol-sectors": JSON.stringify([
                {
                  sectionName: "Indices",
                  symbols: [
                    "FOREXCOM:SPXUSD",
                    "FOREXCOM:NSXUSD",
                    "FOREXCOM:DJI",
                    "INDEX:NKY",
                    "INDEX:DEU40",
                    "FOREXCOM:UKXGBP",
                  ],
                },
                {
                  sectionName: "Futures",
                  symbols: [
                    "BMFBOVESPA:ISP1!",
                    "BMFBOVESPA:EUR1!",
                    "CMCMARKETS:GOLD",
                    "TVC:USOIL",
                    "BMFBOVESPA:CCM1!",
                  ],
                },
                {
                  sectionName: "Bonds",
                  symbols: [
                    "EUREX:FGBL1!",
                    "EUREX:FBTP1!",
                    "EUREX:FGBM1!",
                  ],
                },
                {
                  sectionName: "Forex",
                  symbols: [
                    "FX:EURUSD",
                    "FX:GBPUSD",
                    "FX:USDJPY",
                    "FX:USDCHF",
                    "FX:AUDUSD",
                    "FX:USDCAD",
                  ],
                },
              ]),
              theme: "dark",
            }}
            className="h-[750px] w-full overflow-hidden rounded-xl"
          />
        </div>
      </section>
    </div>
  );
}
