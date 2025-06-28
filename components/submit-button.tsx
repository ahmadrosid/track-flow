"use client"
import { useFormStatus, useFormState } from "react-dom";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./ui/loading-spinner";

export const SubmitButton = forwardRef<HTMLButtonElement, { label: string, className?: string }>(( { label, className }, ref ) => {
    const { pending } = useFormStatus();
    console.log({ pending });
    return (
        <Button ref={ref} type="submit" className={cn('rounded-xl cursor-pointer', className)} disabled={pending} aria-disabled={pending}>
            {pending ? <LoadingSpinner text="Loading..." /> : label}
        </Button>
    );
});

SubmitButton.displayName = "SubmitButton";
