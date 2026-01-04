type FooterVariant = "default" | "login" | "home";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  if (variant === "login") {
    return (
      <footer className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-px bg-black/10" />
          <p className="mt-4 text-sm text-muted-foreground">
            © UBS 1998 – 2025. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  // default/home
  return (
    <footer className="bg-[#F2F2F7] py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm leading-snug text-muted-foreground">
          The products, services, information and/or materials contained within
          these web pages may not be available for residents of certain
          jurisdictions. Please consult the sales restrictions relating to the
          products or services in question for further information. Copying,
          editing, modifying, distributing, sharing, linking or any other use
          (whether for commercial purposes or otherwise) of this material, other
          than personal viewing, without UBS&apos;s prior written permission is
          strictly prohibited © UBS 1998 - 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
