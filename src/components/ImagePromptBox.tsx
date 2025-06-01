
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface ImagePromptBoxProps {
  onPromptSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

const ImagePromptBox = ({ onPromptSubmit, isLoading = false }: ImagePromptBoxProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onPromptSubmit(prompt);
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="glass-card p-4 rounded-lg border border-white/10 mt-4">
      <h3 className="text-sm font-semibold text-gold mb-2">Refine this image</h3>
      <div className="flex gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe the changes you want to make to this image..."
          className="flex-1 min-h-[80px] bg-navy-dark/60 border-white/20 text-white placeholder:text-white/50 resize-none"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="bg-gold hover:bg-gold-dark text-navy-dark px-4"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isLoading && (
        <div className="mt-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Regenerating image with your changes...</span>
          </div>
          <div className="w-full bg-navy-dark/60 rounded-full h-1.5 mt-2">
            <div className="bg-gold h-1.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePromptBox;
