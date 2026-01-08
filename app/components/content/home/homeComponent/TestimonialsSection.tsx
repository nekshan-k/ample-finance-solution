'use client';

import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      nameKey: "testimonial1Name",
      roleKey: "testimonial1Role",
      contentKey: "testimonial1",
      rating: 5,
      avatar: "PS",
    },
    {
      nameKey: "testimonial2Name",
      roleKey: "testimonial2Role",
      contentKey: "testimonial2",
      rating: 5,
      avatar: "RK",
    },
    {
      nameKey: "testimonial3Name",
      roleKey: "testimonial3Role",
      contentKey: "testimonial3",
      rating: 5,
      avatar: "AD",
    },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 overflow-hidden">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 break-words overflow-hidden">
            {t('title')} <span className="gradient-text whitespace-nowrap">{t('titleHighlight')}</span> {t('titleEnd')}
          </h2>
          <p className="text-lg text-muted-foreground break-words overflow-hidden">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 overflow-hidden">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.avatar}
              className="relative bg-card rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 flex-shrink-0" />
              
              <div className="flex gap-1 mb-6 flex-shrink-0">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary flex-shrink-0" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed break-words overflow-hidden">
                "{t(testimonial.contentKey)}"
              </p>
              
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{t(testimonial.nameKey)}</p>
                  <p className="text-sm text-muted-foreground truncate">{t(testimonial.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

