
"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        "flex p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        "w-12 h-6 sm:w-16 sm:h-8", // Responsive sizing
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center rounded-full transition-transform duration-300",
            "w-4 h-4 sm:w-6 sm:h-6", // Responsive sizing
            isDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-6 sm:translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-2 h-2 sm:w-4 sm:h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-2 h-2 sm:w-4 sm:h-4 text-gray-700" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center rounded-full transition-transform duration-300",
            "w-4 h-4 sm:w-6 sm:h-6", // Responsive sizing
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-6 sm:-translate-x-8"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-2 h-2 sm:w-4 sm:h-4 text-gray-500" 
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className="w-2 h-2 sm:w-4 sm:h-4 text-black" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}
