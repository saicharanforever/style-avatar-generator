
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ViewToggleProps = {
  isBackView: boolean;
  onToggle: (isBack: boolean) => void;
};

const ViewToggle = ({ isBackView, onToggle }: ViewToggleProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 w-full max-w-md mx-auto -mt-6 mb-6">
      <Label htmlFor="view-toggle" className="text-xs text-white/70 cursor-pointer">
        {isBackView ? 'Back View' : 'Front View'}
      </Label>
      <Switch
        id="view-toggle"
        checked={isBackView}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-blue-500"
      />
    </div>
  );
};

export default ViewToggle;
