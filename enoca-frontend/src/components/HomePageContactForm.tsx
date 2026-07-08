"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { adminApi } from "@/lib/admin-api";

export default function HomePageContactForm() {
    const tContact = useTranslations('Contact');
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Spam Koruması: Bot bu alanı doldurduysa isteği arka plana gönderme
        if (formData.honeypot) {
            console.warn("Spam tespit edildi. Gönderim engellendi.");
            setStatus("success"); // Bota başarı mesajı göstererek yanılttık
            return;
        }

        setStatus("loading");
        try {
            await adminApi.createMessage({
                name: formData.name,
                email: formData.email,
                message: formData.message
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "", honeypot: "" });
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-8 rounded-2xl text-center border border-green-500/20 backdrop-blur-md">
                <h3 className="text-xl font-semibold mb-2">{tContact('successTitle')}</h3>
                <p className="text-[14px] opacity-90">{tContact('successMessage')}</p>
                <Button variant="secondary" className="mt-6 rounded-lg" onClick={() => setStatus("idle")}>{tContact('newMsgBtn')}</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-tight text-foreground">{tContact('name')}</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder={tContact('namePlaceholder')} 
                        className="w-full h-12 px-4 rounded-lg border border-border/50 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-[14px]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-tight text-foreground">{tContact('email')}</label>
                    <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder={tContact('emailPlaceholder')} 
                        className="w-full h-12 px-4 rounded-lg border border-border/50 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-[14px]"
                    />
                </div>
            </div>
            
            {/* Honeypot Alanı: Botlar için görünmez ancak DOM'da mevcut */}
            <div className="hidden" aria-hidden="true">
                <label>{tContact('honeypotLabel')}</label>
                <input 
                    type="text" 
                    name="contact_me_by_fax_only" 
                    tabIndex={-1} 
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold tracking-tight text-foreground">{tContact('message')}</label>
                <textarea 
                    required 
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={tContact('messagePlaceholder')} 
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all resize-none text-[14px]"
                ></textarea>
            </div>
            <div className="pt-2 text-center">
                <Button size="lg" type="submit" disabled={status === "loading"} className="px-12 w-full md:w-auto rounded-lg text-sm">
                    {status === "loading" ? tContact('submitting') : tContact('submit')}
                </Button>
            </div>
        </form>
    );
}
