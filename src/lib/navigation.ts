import type { IconName } from "@/components/ui/Icon";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  /** Small counter bubble next to the label (e.g. unread messages). */
  badgeKey?: "messages";
};

/** Sidebar menu – one route per item. Order matches the original app. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "My Services", href: "/my-services", icon: "clipboard" },
  { label: "Explore Services", href: "/explore-services", icon: "compass" },
  { label: "Documents", href: "/documents", icon: "folder" },
  { label: "Payments", href: "/payments", icon: "card" },
  { label: "Messages", href: "/messages", icon: "chat", badgeKey: "messages" },
  { label: "Support", href: "/support", icon: "phone" },
  { label: "Profile", href: "/profile", icon: "user" },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
