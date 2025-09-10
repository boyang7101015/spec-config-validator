import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

export default function ParsersHelp() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center cursor-pointer">
          <Info className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Supported parsers: ontap_cli</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
