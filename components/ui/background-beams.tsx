'use client';
import { cn } from '@/lib/utils';
import React from 'react';

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden',
        className
      )}
    >
      <div
        className="absolute -inset-[10px] opacity-50"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--primary)/0.15), transparent 80%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </div>
  );
};