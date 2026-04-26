import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getPrediction } from "@/lib/predictions";
import { langData } from "@/lib/lang";

interface PredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rootNumber: number;
  destinyNumber: number;
  lang: "en" | "hi";
}

const PredictionModal = ({
  open,
  onOpenChange,
  rootNumber,
  destinyNumber,
  lang,
}: PredictionModalProps) => {
  const data = getPrediction(rootNumber, destinyNumber);
  const lines = data?.[lang] ?? [];

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="no-copy bg-gradient-to-br from-[hsl(38,70%,50%)] to-[hsl(25,85%,55%)] border-none max-w-lg mx-4 rounded-2xl shadow-2xl"
        onCopy={handleCopy}
        onContextMenu={handleContextMenu}
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-[hsl(30,25%,2%)] text-center">
            🔮 {langData[lang].modal.title}
          </DialogTitle>

          <DialogDescription className="text-center text-[hsl(25,30%,20%)] font-body text-sm">
            {langData[lang].modal.root}: {rootNumber} ·{" "}
            {langData[lang].modal.destiny}: {destinyNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {lines.length > 0 ? (
            lines.map((line, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-[hsl(25,30%,15%)] mt-0.5">•</span>
                <p className="text-[hsl(25,30%,10%)] font-body text-sm leading-relaxed">
                  {line}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[hsl(237,30%,15%)] font-body text-sm text-center italic">
              {langData[lang].modal.noData}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;