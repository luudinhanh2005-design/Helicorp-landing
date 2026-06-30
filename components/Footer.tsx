import { PawPrint } from "lucide-react";

const footerLinks = [
  { title: "Products", links: ["Smart Feeder", "Litter Box", "Water Fountain", "Grooming Kit"] },
  { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
  { title: "Support", links: ["Help Center", "Contact Us", "Warranty", "Returns"] },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold">
                HeLi<span className="text-accent">Corp</span>
              </span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              Hệ sinh thái công nghệ chăm sóc thú cưng thông minh hàng đầu Việt
              Nam.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm opacity-50 hover:opacity-100 hover:text-accent transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-40">
            © 2026 HeLiCorp. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm opacity-40 hover:opacity-100 hover:text-accent transition">
              Privacy Policy
            </a>
            <a href="#" className="text-sm opacity-40 hover:opacity-100 hover:text-accent transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}