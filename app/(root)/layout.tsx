
 
const layout = ({ children }: { children: React.ReactNode }) => {
   return (
     <main className="min-h-screen tex-gray-400">
         {/*header*/}
       <div className="container py-10 ">
           {children}
       </div>
     </main>
   )
 }
 
 export default layout