
import * as React from "react";
import { useToast } from "@/components/ui/toast";

export { useToast };

export function toast(props: any) {
  const { toast } = useToast();
  toast(props);
}
