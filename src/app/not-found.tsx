import { Button, Pill } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-surface px-5 py-24 text-center">
      <Pill>404</Pill>
      <h1 className="font-lato text-[34px] leading-[1.2] text-heading desk:text-[48px]">This page could not be found</h1>
      <p className="max-w-[520px] font-satoshi text-[18px] leading-[27px] text-muted">The link may be old. Explore our treatments or book a visit.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/">Go to Home</Button>
        <Button href="/contact">Book Appointment</Button>
      </div>
    </section>
  );
}
