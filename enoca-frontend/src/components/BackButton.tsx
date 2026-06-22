"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BackButton() {
    const router = useRouter();
    const t = useTranslations('Page');

    return (
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="pl-2 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('back')}
        </Button>
    );
}
