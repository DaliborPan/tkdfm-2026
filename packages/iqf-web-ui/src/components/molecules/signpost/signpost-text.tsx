import { cn } from "../../../utils/cn";

type SignpostContentProps = {
  title: string;
  subTitle?: string;
  className?: string;
};

export function SignpostText({
  title,
  subTitle,
  className,
}: SignpostContentProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h5 className="text-2xl">{title}</h5>

      {subTitle && <div className="text-m">{subTitle}</div>}
    </div>
  );
}
