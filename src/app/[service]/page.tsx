import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage, type ServiceContent } from "@/components/ServicePage";
import data from "@/content/services.json";

const SERVICES = data as unknown as Record<string, ServiceContent>;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const c = SERVICES[service];
  if (!c) return {};
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/${service}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/${service}` },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const c = SERVICES[service];
  if (!c) notFound();
  return <ServicePage c={c} />;
}
