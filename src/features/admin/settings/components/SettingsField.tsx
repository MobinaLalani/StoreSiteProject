import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function SettingsField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input {...props} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100" /></label>;
}
export function SettingsTextarea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<textarea {...props} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100" /></label>;
}
export function SettingsToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4"><span className="font-semibold text-slate-700">{label}</span><button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-red-500" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${checked ? "right-6" : "right-1"}`} /></button></div>;
}
