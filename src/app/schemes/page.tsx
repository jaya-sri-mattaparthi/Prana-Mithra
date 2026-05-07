'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const schemesData = [
  {
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    targetAudience: "Poor and vulnerable families",
    content: {
      benefits: [
        "Health coverage of up to ₹5 lakh per family per year.",
        "Cashless access to health care services.",
        "Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization expenses."
      ],
      eligibility: "Families identified based on SECC 2011 data.",
      howToApply: "Eligible beneficiaries can get their Ayushman card from designated centers. No specific application is needed if you are on the list."
    }
  },
  {
    title: "Janani Shishu Suraksha Karyakram (JSSK)",
    targetAudience: "Pregnant women and infants",
    content: {
      benefits: [
        "Free and cashless delivery, including C-section.",
        "Free drugs, consumables, and diet during stay.",
        "Free transport from home to health institution.",
        "Free treatment for sick infants up to one year of age."
      ],
      eligibility: "All pregnant women and sick infants accessing public health institutions.",
      howToApply: "Automatically available upon visiting a public health facility for delivery or treatment."
    }
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    targetAudience: "Pregnant and lactating women",
    content: {
      benefits: [
        "Cash incentive of ₹5,000 in three installments.",
        "Promotes better health and nutrition for mother and child."
      ],
      eligibility: "For the first living child of the family.",
      howToApply: "Register at the nearest Anganwadi Centre (AWC) or approved health facility."
    }
  }
];

export default function SchemesPage() {
  const { t } = useLanguage();

  const schemes = schemesData.map(scheme => ({
      ...scheme,
      title: t(scheme.title),
      targetAudience: t(scheme.targetAudience),
      content: {
          benefits: scheme.content.benefits.map(b => t(b)),
          eligibility: t(scheme.content.eligibility),
          howToApply: t(scheme.content.howToApply)
      }
  }));

  return (
    <div className="space-y-8 content-to-read">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('Health Scheme Awareness')}</h1>
        <p className="text-muted-foreground">{t('Learn about government health schemes for your health and well-being.')}</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {schemes.map((scheme, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left">
              <div className="flex flex-col items-start md:flex-row md:items-center">
                <span className="font-semibold">{scheme.title}</span>
                <Badge variant="secondary" className="mt-1 md:mt-0 md:ml-2">{scheme.targetAudience}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 p-4">
              <div>
                <h3 className="font-semibold mb-2">{t('Benefits')}</h3>
                <ul className="space-y-2">
                  {scheme.content.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t('Eligibility')}</h3>
                <p className="text-muted-foreground">{scheme.content.eligibility}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t('How to Apply')}</h3>
                <p className="text-muted-foreground">{scheme.content.howToApply}</p>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                {t('Eligibility Checker & Guidance')}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
