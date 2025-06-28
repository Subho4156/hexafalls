import { Button } from "@/components/ui/button";
// import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { ArrowBigRight } from "lucide-react";
// import { NavigationSheet } from "./navigation-sheet";

const Navbar01Page = () => {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button>
              Get Started <ArrowBigRight />{" "}
            </Button>
            {/* Mobile Menu */}
            <div className="md:hidden">{/* <NavigationSheet /> */}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar01Page;
