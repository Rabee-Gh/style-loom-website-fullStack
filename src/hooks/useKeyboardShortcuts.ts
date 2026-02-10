import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES } from "./useSidebarData";

import { useAuth } from "@/context/AuthContext";

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isAdmin) return;

      const activeElement = document.activeElement;
      const isInput =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement as HTMLElement)?.contentEditable === "true";

      if (isInput) return;

      const pressedKey = event.key.toLowerCase();
      const targetPage = PAGES.find((page) =>
        page.shortcutKey.some(key => key.toLowerCase() === pressedKey)
      );

      if (targetPage) {
        navigate(targetPage.path);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, isAdmin]);
};
