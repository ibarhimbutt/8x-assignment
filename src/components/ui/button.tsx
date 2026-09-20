"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { Slot, type WithAsChild } from "@/components/ui/slot";
import { cn } from "@/lib/utils";

type ButtonPrimitiveProps = WithAsChild<
  HTMLMotionProps<"button"> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function ButtonPrimitive({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonPrimitiveProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium uppercase font-button transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-cyan text-[#050505] shadow-xs hover:brightness-110",
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        destructive:
          "bg-red-500 text-white shadow-xs hover:bg-red-500/90",
        outline:
          "border border-white/20 bg-transparent text-white shadow-xs hover:bg-white/5 hover:border-white/40",
        outlineBlue:
          "border border-cyan bg-transparent text-cyan shadow-xs hover:bg-cyan/10",
        secondary:
          "bg-zinc-800 text-white shadow-xs hover:bg-zinc-700",
        ghost:
          "hover:bg-white/10 hover:text-white",
        link: "text-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 tracking-wide",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 tracking-wide",
        lg: "h-11 px-8 py-3.5 text-[14px] tracking-wide",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitiveProps & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
