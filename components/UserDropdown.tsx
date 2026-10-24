"use client";


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
import { useRouter } from "next/dist/client/components/navigation"

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
  <DropdownMenuTrigger  render={<Button variant="outline" />}>
    <Button variant="ghost" className="flex items-center gap-3 text=gray-3 hover:cyan-400">
    
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserDropdown