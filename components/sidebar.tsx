import Image from "next/image";
import Link from "next/link";

import { DottedSeparater } from "./dotted-separater";
import { Navigation } from "./navigation";
import { Projects } from "./projects";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/" className="h-[48px]">
        <Image src="/logo.svg" alt="logo" width={164} height={48} priority />
      </Link>
      <DottedSeparater className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparater className="my-4" />
      <Navigation />
      <DottedSeparater className="my-4" />
      <Projects />
    </aside>
  );
};
