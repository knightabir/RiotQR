import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Twitter, Github } from "lucide-react";


const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Tools", href: "/tools" },
      { name: "FAQ", href: "/faq" },
      { name: "Our Story", href: "/our-story" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Description */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {/* Optionally add a logo SVG/icon here */}
              <span className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-200 tracking-tight">
                RiotQR
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Instantly create free QR codes and barcodes for all your business, marketing, and personal needs.
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="w-5 h-5" />
                </Button>
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a
                href="mailto:hello@riotqr.com"
                aria-label="Email"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
          {/* Links */}
          <div className="flex-1 flex flex-col sm:flex-row gap-8 justify-end">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Newsletter
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-lg font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Get updates on new QR tools and features. No spam.
            </p>
          </div> */}
        </div>
      </div>
      <Separator className="my-8" />
      <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} RiotQR. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;