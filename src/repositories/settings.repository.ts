import { readJson, updateJson } from "@/src/lib/json-store";

export type Settings = Record<string, unknown>;
function merge(base: Settings, patch: Settings): Settings {
  const result = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (!(key in base)) continue;
    result[key] = value && typeof value === "object" && !Array.isArray(value) && base[key] && typeof base[key] === "object" && !Array.isArray(base[key])
      ? merge(base[key] as Settings, value as Settings) : value;
  }
  return result;
}
export const settingsRepository = {
  getAll: () => readJson<Settings>("settings.json", {}),
  async getPublic() { const all = await this.getAll(); return Object.fromEntries(["store", "inquiry", "social", "appearance", "seo"].filter((key) => key in all).map((key) => [key, all[key]])); },
  async update(patch: Settings) { let result: Settings = {}; await updateJson<Settings>("settings.json", {}, (current) => (result = merge(current, patch))); return result; },
};
