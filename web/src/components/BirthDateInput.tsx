"use client";

import { formatDateInput, isCompleteDate } from "@/lib/date-input";

interface BirthDateInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function BirthDateInput({
  id = "birth-date",
  value,
  onChange,
  placeholder = "ДД.ММ.ГГГГ",
  className = "",
  autoFocus,
}: BirthDateInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(formatDateInput(e.target.value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    onChange(formatDateInput(pasted));
  }

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      maxLength={10}
      aria-label="Дата рождения в формате ДД.ММ.ГГГГ"
      aria-invalid={value.length > 0 && isCompleteDate(value) ? undefined : value.length >= 10}
      spellCheck={false}
      className={className}
    />
  );
}
