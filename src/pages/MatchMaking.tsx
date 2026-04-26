import { useEffect, useState } from "react";
import ComingSoon from "@/components/ComingSoon";
import { langData } from "@/lib/lang";

/**
 * Match Making page.
 *
 * TODO: replace `<ComingSoon />` with the real implementation.
 * Suggested flow:
 *   1. Two DOB inputs (partner A & B)
 *   2. Compute root + destiny + grid for both
 *   3. Score compatibility on each axis and surface a verdict
 */
const MatchMaking = () => {
  const [lang, setLang] = useState<"en" | "hi">(
    () => (localStorage.getItem("lang") as "en" | "hi") || "hi"
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <ComingSoon
      title={langData[lang].match}
      description={
        lang === "hi"
          ? "दो जन्म तिथियों के बीच वैदिक संगतता की गणना करें — जल्द उपलब्ध।"
          : "Calculate Vedic compatibility between two birth dates — coming soon."
      }
      lang={lang}
    />
  );
};

export default MatchMaking;
