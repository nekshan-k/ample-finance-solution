'use client'

import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useTranslations } from 'next-intl';

const contactInfo = [
  {
    icon: Mail,
    titleKey: "contactInfo.email.title",
    descKey: "contactInfo.email.desc",
    value: "hello@amplefinance.com",
    link: "mailto:hello@amplefinance.com",
  },
  {
    icon: Phone,
    titleKey: "contactInfo.phone.title",
    descKey: "contactInfo.phone.desc",
    value: "+91 1800-123-4567",
    link: "tel:+911800123456",
  },
  {
    icon: MapPin,
    titleKey: "contactInfo.visit.title",
    descKey: "contactInfo.visit.desc",
    value: "Jammu, Jammu and Kashmir, India",
    link: "#",
  },
  {
    icon: MessageSquare,
    titleKey: "contactInfo.chat.title",
    descKey: "contactInfo.chat.desc",
    valueKey: "contactInfo.chat.value",
    link: "#",
  },
];

const faqsData = [
  { questionKey: "faqs.q1.question", answerKey: "faqs.q1.answer" },
  { questionKey: "faqs.q2.question", answerKey: "faqs.q2.answer" },
  { questionKey: "faqs.q3.question", answerKey: "faqs.q3.answer" },
  { questionKey: "faqs.q4.question", answerKey: "faqs.q4.answer" },
];

export function Contact() {
  const { toast } = useToast();
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('title')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('subtitle')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <a
                key={info.titleKey}
                href={info.link}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{t(info.titleKey)}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t(info.descKey)}</p>
                <p className="text-sm font-medium text-primary">{info.valueKey ? t(info.valueKey) : info.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.subject')}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">{t('form.selectTopic')}</option>
                      <option value="investment">{t('form.investmentQuery')}</option>
                      <option value="insurance">{t('form.insuranceQuery')}</option>
                      <option value="account">{t('form.accountSupport')}</option>
                      <option value="feedback">{t('form.feedback')}</option>
                      <option value="other">{t('form.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('form.sending')}</>
                  ) : (
                    <>{t('form.send')} <Send className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">{t('faq.title')}</h2>
              <div className="space-y-4">
                {faqsData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-soft"
                  >
                    <h3 className="font-semibold mb-2 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      {t(faq.questionKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm pl-8">
                      {t(faq.answerKey)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-primary/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{t('support.hours')}</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{t('support.weekday')}</p>
                  <p>{t('support.saturday')}</p>
                  <p>{t('support.sunday')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-80 bg-secondary relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              {t('address.line1')}<br />
              {t('address.line2')}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
