import { FC } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const MobileHeader: FC = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center border-b border-slate-200 bg-white px-4 shadow-sm md:hidden">
      <Link
        href="/dashboard"
        className="flex-1 truncate text-xl font-bold text-emerald-600"
      >
        Amani Brew
      </Link>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
        >
          <User className="h-5 w-5 text-slate-700" />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;