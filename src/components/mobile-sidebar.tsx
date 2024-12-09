import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SheetTitle hidden>Sidebar</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
