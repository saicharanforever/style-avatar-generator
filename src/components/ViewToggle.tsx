
import React from 'react';
import { Button } from "@/components/ui/button";

type ViewToggleProps = {
  isBackView: boolean;
  onToggle: (isBack: boolean) => void;
};

const ViewToggle = ({ isBackView, onToggle }: ViewToggleProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => onToggle(false)} 
            variant={isBackView ? "outline" : "default"}
            className={`flex-1 ${!isBackView ? "bg-blue-500" : "bg-navy-dark/60 border-blue-900"}`}
          >
            Front View
          </Button>
          <Button 
            onClick={() => onToggle(true)} 
            variant={isBackView ? "default" : "outline"}
            className={`flex-1 ${isBackView ? "bg-blue-500" : "bg-navy-dark/60 border-blue-900"}`}
          >
            Back View
          </Button>
        </div>
        <p className="text-xs text-white/70 text-center">
          {isBackView 
            ? "Upload clothing from the back side to see how it looks on the model from behind"
            : "Upload clothing from the front side to see how it looks on the model from the front"}
        </p>
      </div>
    </div>
  );
};

export default ViewToggle;
