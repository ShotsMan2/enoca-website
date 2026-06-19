"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HomePageContactForm() {
    const tContact = useTranslations('Contact');
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus("success");
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-8 rounded-2xl text-center border border-green-200 dark:border-green-800">
                <h3 className="text-2xl font-bold mb-2">Teşekkürler!</h3>
                <p>Mesajınız başarıyla alınmıştır. En kısa sürede size dönüş yapacağız.</p>
                <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>Yeni Mesaj Gönder</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{tContact('name')}</label>
                    <input 
                        type="text" 
                        required 
                        placeholder={tContact('namePlaceholder')} 
                        className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{tContact('email')}</label>
                    <input 
                        type="email" 
                        required 
                        placeholder={tContact('emailPlaceholder')} 
                        className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{tContact('message')}</label>
                <textarea 
                    required 
                    rows={4}
                    placeholder={tContact('messagePlaceholder')} 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
            </div>
            <div className="pt-2 text-center">
                <Button size="lg" type="submit" disabled={status === "loading"} className="px-12 w-full md:w-auto">
                    {status === "loading" ? "Gönderiliyor..." : tContact('submit')}
                </Button>
            </div>
        </form>
    );
}
