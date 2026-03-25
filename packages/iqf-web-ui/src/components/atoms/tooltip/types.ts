export type TooltipProps = {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  showArrow?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  disableHoverableContent?: boolean;
};
