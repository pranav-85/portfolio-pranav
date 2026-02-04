import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border py-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Separator className="mb-6" />
        <p className="text-center text-sm text-muted-foreground">
          © {year} Sai Pranav. Built with Next.js and shadcn/ui.
        </p>
      </div>
    </footer>
  );
}
