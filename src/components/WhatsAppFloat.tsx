import { Icon } from "./icons";
import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Prodontics on WhatsApp"
      className="fixed right-[5px] bottom-7 z-40 flex w-[149px] items-center justify-center gap-[10px] rounded-[12px] bg-brand p-[10px] transition-transform duration-200 hover:scale-[1.03] tab:right-[10px] tab:w-auto"
    >
      <span className="font-satoshi text-[14px] leading-[21px] font-bold text-white">Saving tooth, Caring Smiles</span>
      <Icon name="whatsapp" className="size-6 text-white" />
    </a>
  );
}
