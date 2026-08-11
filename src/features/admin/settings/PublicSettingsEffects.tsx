"use client";
import { useEffect } from "react";
import { usePublicSettings } from "./hooks/useSettings";
export default function PublicSettingsEffects() { const { data } = usePublicSettings(); useEffect(() => { if (data) document.documentElement.style.setProperty("--brand", data.appearance.primaryColor); }, [data]); return null; }
