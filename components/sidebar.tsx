import Image from "next/image";
import Link from "next/link";

import { DottedSeparater } from "./dotted-separater";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparater className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparater className="my-4" />
      <Navigation />
    </aside>
  );
};
