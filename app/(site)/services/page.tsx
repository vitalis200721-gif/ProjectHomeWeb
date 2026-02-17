"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";

const services = [
  {
    title: "Architecture",
    description:
      "We provide comprehensive architectural services, from feasibility studies and conceptual design to construction documentation and site supervision.",
    icon: "🏛️",
  },
  {
    title: "Interior Design",
    description:
      "Our interior designers craft spaces that reflect your lifestyle and personality, balancing aesthetics with function.",
    icon: "🛋️",
  },
  {
    title: "Renovation & Restoration",
    description:
      "We breathe new life into existing buildings, preserving character while upgrading performance and comfort.",
    icon: "🛠️",
  },
  {
    title: "Consultation",
    description:
      "We offer expert advice on sustainability, materials, construction methods and design trends to guide your project decisions.",
    icon: "💡",
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project duration varies based on scale and complexity. Our residential projects typically range from 6 to 18 months, including design and construction phases.",
  },
  {
    question: "Do you handle building permits?",
    answer:
      "Yes. We manage all necessary permits and approvals to ensure your project meets regulatory requirements.",
  },
  {
    question: "What is the cost of an initial consultation?",
    answer:
      "The initial consultation is complimentary. During this meeting we discuss your goals, budget and timeline.",
  },
  {
    question: "Can you work with my contractor?",
    answer:
      "Absolutely. We collaborate with your chosen contractors or recommend trusted partners to deliver your project.",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-3xl font-semibold">Services</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-4">{svc.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{svc.title}</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{svc.description}</p>
          </div>
        ))}
      </div>
      {/* Packages summary similar to home page */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Packages</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Essential",
              price: "€3k+",
              features: [
                "Initial consultation",
                "Concept sketches",
                "Material moodboard",
              ],
            },
            {
              name: "Signature",
              price: "€10k+",
              features: [
                "Detailed 3D model",
                "Full project management",
                "Custom furniture design",
              ],
              popular: true,
            },
            {
              name: "Elite",
              price: "€20k+",
              features: [
                "Unlimited revisions",
                "On-site supervision",
                "Post-completion styling",
              ],
            },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-lg flex flex-col border ${pkg.popular ? 'border-accent-olive dark:border-accent-copper' : 'border-transparent'}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-olive dark:bg-accent-copper text-white text-xs px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-2 text-center">{pkg.name}</h3>
              <p className="text-center text-3xl font-bold mb-4">{pkg.price}</p>
              <ul className="space-y-2 flex-grow">
                {pkg.features.map((feat) => (
                  <li key={feat} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    ✔️ {feat}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-accent-olive dark:bg-accent-copper text-white rounded-md hover:opacity-90"
                >
                  Choose package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-neutral-200 dark:border-neutral-700">
              <AccordionTrigger className="w-full py-3 flex justify-between items-center text-left">
                <span className="font-medium">{faq.question}</span>
                <span>+</span>
              </AccordionTrigger>
              <AccordionContent className="py-2 text-sm text-neutral-700 dark:text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
