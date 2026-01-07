import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useTranslations } from 'next-intl';

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  products: [
    { name: "Mutual Funds", href: "/products/mutual-funds" },
    { name: "Insurance", href: "/products/insurance" },
    { name: "SIP Calculator", href: "#" },
    { name: "Compare Funds", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
  legal: [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
    { name: "Regulatory", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const t = useTranslations('footer');
  
  const footerLinks = {
    company: [
      { nameKey: "company.about", href: "/about" },
      { nameKey: "company.careers", href: "#" },
      { nameKey: "company.press", href: "#" },
      { nameKey: "company.blog", href: "#" },
    ],
    products: [
      { nameKey: "products.mutualFunds", href: "/products/mutual-funds" },
      { nameKey: "products.insurance", href: "/products/insurance" },
      { nameKey: "products.sipCalculator", href: "#" },
      { nameKey: "products.compareFunds", href: "#" },
    ],
    support: [
      { nameKey: "support.helpCenter", href: "#" },
      { nameKey: "support.contactUs", href: "/contact" },
      { nameKey: "support.faqs", href: "#" },
      { nameKey: "support.privacyPolicy", href: "#" },
    ],
    legal: [
      { nameKey: "legal.terms", href: "#" },
      { nameKey: "legal.privacy", href: "#" },
      { nameKey: "legal.disclaimer", href: "#" },
      { nameKey: "legal.regulatory", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];
  
  return (
    <footer className="bg-card dark:bg-card text-foreground dark:text-foreground">
      <div className="border-b border-primary/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
              <p className="text-muted-foreground">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <Button variant="gradient" size="lg" className="whitespace-nowrap">
                {t('newsletter.subscribe')} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">
                Ample<span className="text-primary">Finance</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('about')}
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@amplefinance.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@amplefinance.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>{t('address')}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('company.title')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('products.title')}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('support.title')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('legal.title')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

