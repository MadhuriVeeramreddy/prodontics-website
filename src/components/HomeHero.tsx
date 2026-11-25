import { Carousel } from "./Carousel";
import { Icon } from "./icons";
import { BlurText, Button, Pill, Reveal } from "./ui";
import { HERO_IMAGES, SITE } from "@/lib/site";

/** Phone button sitting in a notch cut from the image's top-right corner. */
export function PhoneNotch() {
  const corner = "radial-gradient(circle at 0 100%, transparent 23.5px, var(--color-surface) 24px)";
  return (
    <div className="absolute top-0 right-0 z-10 size-14 rounded-bl-[24px] bg-surface" aria-hidden={false}>
      <span className="absolute top-0 -left-6 size-6" style={{ background: corner }} aria-hidden />
      <span className="absolute -bottom-6 right-0 size-6" style={{ background: corner }} aria-hidden />
      <a
        href={`tel:${SITE.phoneTel}`}
        aria-label={`Call ${SITE.phoneDisplay}`}
        className="absolute top-0 right-0 flex size-12 items-center justify-center rounded-[40px] bg-brand p-3 transition-transform hover:scale-105"
      >
        <Icon name="phone_hero" className="size-6 text-white" />
      </a>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="flex w-full justify-center bg-surface px-5 pt-8 pb-16 tab:px-20 tab:pt-16 desk:pb-32">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-12 desk:flex-row desk:justify-center">
        <div className="flex w-full max-w-[650px] flex-col items-center gap-7 desk:items-start">
          <div className="flex w-full flex-col items-center gap-4 tab:gap-3 desk:items-start desk:gap-4">
            <Pill>Trusted by 10000+ people</Pill>
            <BlurText
              as="h1"
              text="Your Trusted Family {Dental Care Destination} in Kokapet, Hyderabad"
              className="w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-hero capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-left desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
            />
            <p className="w-full text-center font-satoshi text-[18px] leading-[27px] font-bold text-ink desk:text-left">
              Led by Dr. Surya Teja S with 15+ years of expertise in advanced dental implantology and cosmetic dentistry, we provide painless,
              world-class dental care to families across Kokapet, Gachibowli, Narsingi, and Financial District.
            </p>
            <p className="w-full text-center font-satoshi text-[18px] leading-[1.6] text-ink tab:leading-[1.8] desk:text-left desk:leading-[1.5]">
              Providing expert dental care for families in Kokapet and across Hyderabad — with advanced technology, personalized attention, and ethical
              treatment.
            </p>
          </div>
          <Button href="/contact">Book Appointment</Button>
          <div className="flex w-full items-center justify-center rounded-[12px] bg-pill p-3">
            <p className="w-full text-center font-satoshi text-[18px] leading-[1.6] text-ink tab:leading-[1.8] desk:text-left desk:leading-[1.5]">
              Only 6 Appointments a Day – the privilege of time, reserved for you
            </p>
          </div>
        </div>
        <Reveal className="relative w-full shrink-0 desk:w-[305px] wide:w-[500px]">
          <Carousel images={HERO_IMAGES} alt="Prodontics dental clinic, Kokapet" className="aspect-[350/245] w-full tab:aspect-[864/541] desk:aspect-[305/400]" />
          <PhoneNotch />
        </Reveal>
      </div>
    </section>
  );
}
