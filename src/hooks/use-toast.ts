
import * as React from "react";
import { useToast as useToastPrimitive } from "@/components/ui/toast";

export const useToast = useToastPrimitive;

export function toast(props: any) {
  const { toast } = useToastPrimitive();
  toast(props);
}
