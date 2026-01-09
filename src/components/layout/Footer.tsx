export function Footer({ variant = "default" }) {
  if (variant === "login") {
    return (
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm">
          <div className="h-px bg-black/10" />

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            <a className="underline hover:no-underline" href="#">Information on UBS</a>
            <a className="underline hover:no-underline" href="#">Terms of use</a>
            <a className="underline hover:no-underline" href="#">Privacy statement</a>
            <a className="underline hover:no-underline" href="#">Report fraudulent mail</a>
          </div>

          <p className="mt-6 max-w-6xl text-muted-foreground">
            The products, services, information and/or materials contained within these web pages may not be available
            for residents of certain jurisdictions. Please consult the sales restrictions relating to the products or
            services in question for further information.
          </p>

          <p className="mt-2 text-muted-foreground">© UBS 1998 – 2025. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  else {
    return (
      <footer className="bg-[#F2F2F7] py-4">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm leading-snug text-muted-foreground">
            The products, services, information and/or materials contained within these web pages may not be available for residents of certain jurisdictions. Please consult the sales restrictions relating to the products or services in question for further information.
            Copying, editing, modifying, distributing, sharing, linking or any other use (whether for commercial purposes or otherwise) of this material, other than personal viewing, without UBS's prior written permission is strictly prohibited
            © UBS 1998 - 2025. All rights reserved.
          </p>
        </div>
      </footer>


    )
  }

}
