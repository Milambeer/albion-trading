import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToasterTemplate } from "../type";
import { useEffect, useState } from "react";

const TEMPLATES = {
  [ToasterTemplate.ERROR]: {
    borderColor: "border-red-500 bg-neutral-950 text-neutral-300",
    textColor: "text-red-500",
    backgroundColor: "bg-red-500/10",
    titleColor: "text-red-500",
    role: "error",
  },
};

interface ToasterProps {
  title: string;
  content: string;
  type: ToasterTemplate;
  onClose?: () => void;
  closeAfterMs?: number;
}

export const Toaster = ({
  type,
  title,
  content,
  onClose = () => {},
  closeAfterMs = 0,
}: ToasterProps) => {
  const [display, setDisplay] = useState(true);
  const template = TEMPLATES[type];

  useEffect(() => {
    if (closeAfterMs !== 0 && !!TEMPLATES[type])
      setTimeout(() => {
        setDisplay(false);
      }, closeAfterMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!template || !display) return;

  return (
    <div className="z-99 group pointer-events-none fixed inset-x-8 top-0 flex max-w-full flex-col gap-2 bg-transparent px-6 py-6 md:bottom-0 md:left-[unset] md:right-0 md:top-[unset] md:max-w-sm">
      <div
        className={`pointer-events-auto relative rounded-md border ${TEMPLATES[type].borderColor}`}
        role={template.role}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className={`flex w-full items-center gap-2.5 rounded-md p-4 ${template.backgroundColor}`}
        >
          <ExclamationTriangleIcon className="size-16 text-red-500" />

          <div className="flex flex-col gap-2">
            <h3 className={`text-sm font-semibold ${template.titleColor}`}>
              {title}
            </h3>
            <p className="text-pretty text-sm">{content}</p>
          </div>
          <button
            type="button"
            className="ml-auto"
            aria-label="dismiss notification"
            onClick={onClose}
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
