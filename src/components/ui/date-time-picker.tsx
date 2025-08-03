"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

// The component now accepts `value` and `onChange` to be controlled externally.
interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker24h({ value, onChange }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Create a memoized array of hours to avoid re-calculating on every render.
  const hours = React.useMemo(
    () => Array.from({ length: 24 }, (_, i) => i),
    []
  );
  const minutes = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => i * 5),
    []
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      // Preserve the existing time when the date changes.
      if (value) {
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
      }
      onChange(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", timeValue: string) => {
    // Start with the current value, or now if none is set.
    const newDate = value ? new Date(value) : new Date();
    if (type === "hour") {
      newDate.setHours(parseInt(timeValue));
    } else {
      newDate.setMinutes(parseInt(timeValue));
    }
    onChange(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "MM/dd/yyyy HH:mm") // Use HH for 24-hour format
          ) : (
            <span>Select date and time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[288px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-full sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={
                      value && value.getHours() === hour ? "default" : "ghost"
                    }
                    className="w-full shrink-0"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-full sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={
                      value && value.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="w-full shrink-0"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
