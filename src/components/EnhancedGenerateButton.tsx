
import React from 'react';
import GenerateButton from './GenerateButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EnhancedGenerateButtonProps {
  onGenerate: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const EnhancedGenerateButton = ({ onGenerate, disabled, loading }: EnhancedGenerateButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <GenerateButton 
              onClick={onGenerate}
              disabled={disabled || false}
              isGenerating={loading || false}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-navy-dark border border-white/10 text-white">
          <p>Generate 1 image (consumes 30 credits)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EnhancedGenerateButton;
