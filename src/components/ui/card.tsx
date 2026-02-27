import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-300",
          "hover:border-white/20 hover:shadow-accent/10",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = (
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) => (
  <div className={cn("px-8 pt-8 pb-3 space-y-2", className)} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight",
      className
    )}
    {...props}
  />
);

const CardDescription = (
  { className, ...props }: React.HTMLAttributes<HTMLParagraphElement>
) => (
  <p
    className={cn("text-sm text-muted leading-relaxed", className)}
    {...props}
  />
);

const CardContent = (
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) => <div className={cn("px-8 pb-8 pt-3", className)} {...props} />;

const CardFooter = (
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) => <div className={cn("px-8 pb-8 pt-3", className)} {...props} />;

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
