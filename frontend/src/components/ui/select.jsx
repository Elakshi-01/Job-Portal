import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Main Select Root
function Select({ ...props }) {
  return <SelectPrimitive.Root {...props} />;
}

// Group (optional)
function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group {...props} />;
}

// Value placeholder
function SelectValue({ ...props }) {
  return <SelectPrimitive.Value {...props} />;
}

// Trigger (button to open Select)
const SelectTrigger = React.forwardRef(
  ({ className, children, size = "default", ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="w-4 h-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = "SelectTrigger";

// Content (the dropdown)
const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", align = "center", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md",
          "origin-(--radix-select-content-transform-origin)",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1 w-full">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

// Item inside dropdown
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
      <CheckIcon className="w-4 h-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

// Optional separator
function SelectSeparator({ className, ...props }) {
  return <SelectPrimitive.Separator className={cn("h-px bg-border my-1", className)} {...props} />;
}

// Scroll buttons (optional)
function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton className={cn("flex items-center justify-center py-1", className)} {...props}>
      <ChevronUpIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton className={cn("flex items-center justify-center py-1", className)} {...props}>
      <ChevronDownIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
