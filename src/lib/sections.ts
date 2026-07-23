import { User, Briefcase, FolderKanban, Trophy, Send, type LucideIcon } from "lucide-react";

// Single source of truth for the home-page sections: id, label, and the icon
// used both in the sidebar nav and each section's heading (replacing the old
// 01/02/03 numbering).
export type SectionMeta = { id: string; label: string; icon: LucideIcon };

export const SECTIONS: SectionMeta[] = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Work", icon: FolderKanban },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Contact", icon: Send },
];
