'use client'

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { useAuth } from "@/app/context/AuthContext";
import { LoginModal } from "@/app/components/LoginModal";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { CurrencySwitcher } from "@/app/components/CurrencySwitcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/app/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';

export const Navbar = memo(function Navbar() {
  const t = useTranslations('nav');
  
  const navLinks = [
    { name: t('home'), href: "/" },
    {
      name: t('products'),
      href: "/pages/products",
      submenu: [
        { name: t('mutualFunds'), href: "/pages/products/mutual-funds" },
        { name: t('insurance'), href: "/pages/products/insurance" },
        { name: t('loans'), href: "/pages/products/loans" }
      ]
    },
    { name: t('about'), href: "/pages/about" },
    { name: t('contact'), href: "/pages/contact" }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');

  const isLinkActive = useCallback((link: typeof navLinks[0]) => {
    if (!link.submenu) {
      return pathname === link.href;
    }
    return pathname === link.href || link.submenu.some(sub => pathname === sub.href);
  }, [pathname]);

  const isSubLinkActive = useCallback((href: string) => {
    return pathname === href;
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = useCallback((name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/95 dark:bg-card/95 backdrop-blur-lg shadow-soft py-3" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Ample Finance Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="text-lg font-bold hidden sm:inline">
              Ample<span className="gradient-text">Finance</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <div key={link.name} className="relative">
                {!link.submenu ? (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium",
                      isLinkActive(link)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSubmenu(link.name)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      isLinkActive(link)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openSubmenu === link.name && "rotate-180"
                      )}
                    />
                  </button>
                )}

                {link.submenu && openSubmenu === link.name && (
                  <div className="absolute top-full left-0 mt-2 bg-card dark:bg-card border border-border rounded-xl shadow-card min-w-[200px]">
                    {link.submenu.map(s => (
                      <Link
                        key={s.name}
                        href={s.href}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-accent rounded-lg",
                          isSubLinkActive(s.href)
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex gap-2 items-center">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Button variant="outline" size="sm">{tCommon('getStarted')}</Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/15 transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className="text-xs font-semibold text-foreground leading-tight">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{user.phoneNumber}</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground hidden xl:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 mt-2">
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer rounded-md text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {tAuth('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="gradient" size="sm" onClick={() => setIsLoginModalOpen(true)}>
                {tAuth('login')}
              </Button>
            )}
          </div>

          <button 
            className="lg:hidden p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 bg-card dark:bg-card rounded-xl shadow-card p-4 border border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <div key={link.name}>
                  {!link.submenu ? (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium",
                        isLinkActive(link)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm font-medium",
                        isLinkActive(link)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openSubmenu === link.name && "rotate-180"
                        )}
                      />
                    </button>
                  )}

                  {link.submenu && openSubmenu === link.name && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.submenu.map(s => (
                        <Link
                          key={s.name}
                          href={s.href}
                          className={cn(
                            "block px-3 py-2 text-sm",
                            isSubLinkActive(s.href)
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-primary"
                          )}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 space-y-2">
                <LanguageSwitcher />
                <CurrencySwitcher />
                <Button variant="outline" className="w-full">{tCommon('getStarted')}</Button>
                {user ? (
                  <div className="space-y-3">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-xl hover:bg-primary/15 transition-all duration-200 w-full outline-none focus:outline-none"
                    >
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.phoneNumber}</p>
                      </div>
                      <LogOut className="w-4 h-4 text-destructive flex-shrink-0" />
                    </button>
                  </div>
                ) : (
                  <Button variant="gradient" className="w-full" onClick={() => setIsLoginModalOpen(true)}>
                    {tAuth('login')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
});

