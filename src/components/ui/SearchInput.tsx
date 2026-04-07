"use client";

type SearchInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <label className="w-full max-w-xl">
      <span className="mb-2 block text-sm font-medium text-stone-700">{label}</span>
      <div className="group flex items-center gap-2 rounded-2xl border border-stone-300 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200">
        <svg
          className="h-5 w-5 text-stone-500"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm9 16-3.9-3.9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
      </div>
    </label>
  );
}
