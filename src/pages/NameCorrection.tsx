import { useEffect, useState } from "react";
import ComingSoon from "@/components/ComingSoon";
import { langData } from "@/lib/lang";

/**
 * Name Correction page.
 *
 * TODO: replace `<ComingSoon />` with the real implementation.
 * Suggested flow:
 *   1. Input: full name + DOB
 *   2. Compute current name number vs destiny number
 *   3. Suggest spelling tweaks that re-balance the grid
 */
const NameCorrection = () => {
  const [lang, setLang] = useState<"en" | "hi">(
    () => (localStorage.getItem("lang") as "en" | "hi") || "hi"
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <ComingSoon
      title={langData[lang].name}
      description={
        lang === "hi"
          ? "अपने नाम की वर्तनी को अपने भाग्य अंक के साथ संरेखित करें — जल्द उपलब्ध।"
          : "Align your name's spelling with your destiny number — coming soon."
      }
      lang={lang}
    />
  );
};

export default NameCorrection;
