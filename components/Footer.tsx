import { personalInfo } from "@/constants/data";
import { GitHub, LinkedIn, Mail, Upwork } from "./icons";

const links = [
  { label: "GitHub", href: personalInfo.social.github, Icon: GitHub },
  { label: "LinkedIn", href: personalInfo.social.linkedin, Icon: LinkedIn },
  { label: "Upwork", href: personalInfo.social.upwork, Icon: Upwork },
  { label: "Email", href: `mailto:${personalInfo.email}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline pb-14 md:pb-0 md:pl-[60px]">
      <div className="mx-auto flex max-w-site flex-col gap-6 px-6 py-10 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. {personalInfo.location}.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 py-1 text-ink-subtle transition-colors hover:text-ink"
              >
                <Icon width={14} height={14} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
