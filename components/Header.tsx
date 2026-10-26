  import Link from "next/link"
import NavItems from "./NavItems"
import UserDropdown from "./UserDropdown"
import Image from "next/image"


  const Header = () => {
    return (
      <header className="sticky top-0 header">
        <div className="container header-wrapper">
         
          <Link href="/">
            <Image src='/NextLogo.png'  alt="NextTrader Logo"
  width={200}
  height={160}
  priority className="block h-auto w-32  object-contain"/>
          
          </Link>
          <nav className="hidden sm:block">
            <NavItems />
          </nav>

          <UserDropdown />
        </div>
      </header>
    )
  }

  export default Header