"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = { value: string; label: string };

type ServiceSelectProps = {
  name: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

/**
 * Dropdown that renders Select2's markup (`.select2-container--default ...`) so the
 * template's select2 styles apply, without pulling jQuery + Select2 into the bundle.
 */
export function ServiceSelect({ name, placeholder, options, value, onChange }: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setHighlight((h) => (h + (e.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(highlight);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <span
      ref={ref}
      className={`select2 select2-container select2-container--default${open ? " select2-container--open select2-container--below" : ""}`}
      style={{ width: "100%", position: "relative" }}
    >
      <input type="hidden" name={name} value={value} />
      <span className="selection">
        <span
          className="select2-selection select2-selection--single"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={placeholder}
          tabIndex={0}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
        >
          <span className="select2-selection__rendered" title={selected?.label ?? placeholder}>
            {selected ? selected.label : <span className="select2-selection__placeholder">{placeholder}</span>}
          </span>
          <span className="select2-selection__arrow" role="presentation">
            <b role="presentation" />
          </span>
        </span>
      </span>
      {open && (
        <span className="select2-dropdown select2-dropdown--below" style={{ position: "absolute", left: 0, top: "100%", width: "100%", zIndex: 1051 }}>
          <span className="select2-results">
            <ul className="select2-results__options" role="listbox" id={listId}>
              {options.map((o, i) => (
                <li
                  key={o.value}
                  className={`select2-results__option select2-results__option--selectable${i === highlight ? " select2-results__option--highlighted" : ""}${o.value === value ? " select2-results__option--selected" : ""}`}
                  role="option"
                  aria-selected={o.value === value}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(i);
                  }}
                >
                  {o.label}
                </li>
              ))}
            </ul>
          </span>
        </span>
      )}
    </span>
  );
}
