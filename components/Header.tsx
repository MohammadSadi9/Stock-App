  import Link from "next/link"
import NavItems from "./NavItems"
import UserDropdown from "./UserDropdown"

  const Header = () => {
    return (
      <header className="sticky top-0 header">
        <div className="container header-wrapper">
          <h1 className="text-2xl font-bold">My App</h1>
          <Link href="/">
            
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