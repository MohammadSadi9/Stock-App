"use client";

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NavItems from "./NavItems";

const UserDropdown = () => {
const router = useRouter();

    const handleSignOut = async () => {
        router.push("/sign-in");
    };



     const user = {
        name: "John Doe",
        email: "123@gmail.com"};

  return (

<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <Button
        variant="ghost"
        className="flex items-center gap-3 text-gray-400 hover:text-cyan-400"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://static-images.aptoide.com/_next/image?url=https%3A%2F%2Fcdn.aptoide.com%2Fimgs%2F1%2F5%2Ff%2F15fff5365b73948897965cc69bcc79e8_icon.png&w=256&q=75" />
          <AvatarFallback className="bg-cyan-400 font-bold text-black">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="hidden flex-col items-start md:flex">
          <span className="text-base font-medium">
            {user.name}
          </span>
        </div>
      </Button>
    }
  />

  <DropdownMenuContent className="w-64 max-w-[calc(100vw-2rem)] text-gray-400" align="end">
    <DropdownMenuGroup>
<DropdownMenuLabel className="max-w-full">
  <div className="flex items-center gap-3 py-2">
    <Avatar className="h-10 w-10 shrink-0">
      <AvatarImage src="https://static-images.aptoide.com/_next/image?url=https%3A%2F%2Fcdn.aptoide.com%2Fimgs%2F1%2F5%2Ff%2F15fff5365b73948897965cc69bcc79e8_icon.png&w=256&q=75" />
      <AvatarFallback className="bg-cyan-400 font-bold text-black">
        {user.name[0]}
      </AvatarFallback>
    </Avatar>

    <div className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-base font-medium">
        {user.name}
      </span>

      <span className="truncate text-xs text-gray-500">
        {user.email}
      </span>
    </div>
  </div>
</DropdownMenuLabel>

      <DropdownMenuSeparator className="bg-gray-600" />

      <DropdownMenuItem
        onClick={handleSignOut}
        className="cursor-pointer text-gray-400 transition-colors focus:bg-transparent focus:text-cyan-400"
      >
        <LogOut className="mr-2 h-4 w-4 hidden sm:block" />
        Log Out
      </DropdownMenuItem>
      <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
          <nav className="sm:hidden">
            <NavItems/>
          </nav>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserDropdown