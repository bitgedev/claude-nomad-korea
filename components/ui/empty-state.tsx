import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon?: React.ReactNode;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, message, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      {icon && <div className="text-5xl text-[#1B9AAA]/40">{icon}</div>}
      <p className="text-[#6B6B6B] dark:text-gray-400">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button
          onClick={onAction}
          className="bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
