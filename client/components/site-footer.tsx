import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-center gap-4 h-24">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          {siteConfig.name} © 2025
        </p>
      </div>
    </footer>
  );
}
