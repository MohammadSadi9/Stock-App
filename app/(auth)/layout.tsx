import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
      <Link
  href="/"
  className="flex items-center justify-center"
>
  <Image
    src="/NextLogo.png"
    alt="NextTrader Logo"
    width={200}
    height={100}
    priority
    className="h-12 w-auto object-contain"
  />
</Link>

         <div className="pb-6 lg:pb-8 flex-1">
        {children}
         </div>
      </section>
      <section className='auth-right-section'>
         <div className="z-10 lg:mt-4 lg:mb-16 ">
              <blockquote className="auth-block-qoute">
         <p className="mt-6 text-base font-bold leading-relaxed text-gray-300 lg:text-[50px]">
  “The market moves fast. With NextTrader, I have the insights I need to
  stay informed and make every decision with greater confidence.”
</p>

  <h3 className="mt-4 text-sm font-semibold tracking-wide text-cyan-400">
    Trade smarter. Stay ahead.
  </h3>

  <p className="mt-2 text-sm text-gray-400">
    NextTrader — Your edge in the markets.
  </p>
              </blockquote>
         </div>
           <div className="flex-1 relative">
             <Image src="/dashboard preview.png"    width={1440} height={1150} className="auth-dashboard-preview absolute top-0 "/>
           </div>
      </section>
    </main>
  );
};

export default Layout;
