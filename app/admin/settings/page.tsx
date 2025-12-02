"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Save, AlertTriangle, CheckCircle, Globe, Code, Power, Loader2, Info, RefreshCw, Sliders } from "lucide-react";

interface Settings {
  site_name?: string;
  version?: string;
  maintenance_mode?: boolean;
  [key: string]: any;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [editedSettings, setEditedSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await adminFetch("/admin/api/settings");
        const data = await res.json();
        setSettings(data);
        setEditedSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateSetting = (key: string, value: any) => {
    setEditedSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await adminFetch("/admin/api/settings", {
        method: "PUT",
        body: JSON.stringify(editedSettings),
      });
      setSettings(editedSettings);
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    setEditedSettings(settings || {});
    setHasChanges(false);
    setSaveSuccess(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-cyan-400 text-lg font-medium">Loading system settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <p className="text-red-300">Failed to load settings</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sliders className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            System Settings
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Configure and manage your automotive admin system
        </p>
      </div>

      {/* Save Status Banner */}
      {saveSuccess && (
        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-300 font-medium">Settings saved successfully!</p>
          </div>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 animate-pulse" />
              <p className="text-orange-300 font-medium">You have unsaved changes</p>
            </div>
            <button
              onClick={resetChanges}
              className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Changes
            </button>
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* General Settings */}
        <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              General Settings
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Site Name */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-3 h-3" />
                Site Name
              </label>
              <input
                type="text"
                className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                value={editedSettings.site_name || ""}
                onChange={(e) => updateSetting("site_name", e.target.value)}
                placeholder="Enter site name"
              />
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <Info className="w-3 h-3" />
                This name appears throughout the admin interface
              </p>
            </div>

            {/* Version */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-3 h-3" />
                System Version
              </label>
              <input
                type="text"
                className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                value={editedSettings.version || ""}
                onChange={(e) => updateSetting("version", e.target.value)}
                placeholder="e.g., 1.0.0"
              />
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <Info className="w-3 h-3" />
                Current version of your system
              </p>
            </div>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Power className="w-6 h-6 text-cyan-400" />
              Maintenance Mode
            </h2>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-br from-zinc-900/50 to-black border border-orange-500/20 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Power className={`w-6 h-6 ${editedSettings.maintenance_mode ? "text-orange-400" : "text-green-400"}`} />
                    <h3 className="text-lg font-bold text-white">
                      Maintenance Mode
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    When enabled, the public website will display a maintenance message. Admin access remains available.
                  </p>
                  
                  {/* Status Indicator */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    editedSettings.maintenance_mode 
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      editedSettings.maintenance_mode ? "bg-orange-400 animate-pulse" : "bg-green-400"
                    }`} />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {editedSettings.maintenance_mode ? "Maintenance Active" : "System Online"}
                    </span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => updateSetting("maintenance_mode", !editedSettings.maintenance_mode)}
                  className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                    editedSettings.maintenance_mode
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  } shadow-lg ${
                    editedSettings.maintenance_mode ? "shadow-orange-500/30" : "shadow-green-500/30"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-all duration-300 shadow-lg ${
                      editedSettings.maintenance_mode ? "left-11" : "left-1"
                    }`}
                  >
                    {editedSettings.maintenance_mode ? (
                      <AlertTriangle className="w-5 h-5 text-orange-500 m-1.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500 m-1.5" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* System Information */}
        <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Info className="w-6 h-6 text-cyan-400" />
              System Information
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Current Site Name</p>
                <p className="text-white font-semibold text-lg">{settings.site_name || "Not Set"}</p>
              </div>

              <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">System Version</p>
                <p className="text-white font-semibold text-lg">{settings.version || "Not Set"}</p>
              </div>

              <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    settings.maintenance_mode ? "bg-orange-400 animate-pulse" : "bg-green-400"
                  }`} />
                  <p className={`font-semibold text-lg ${
                    settings.maintenance_mode ? "text-orange-400" : "text-green-400"
                  }`}>
                    {settings.maintenance_mode ? "Maintenance" : "Online"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="sticky bottom-8 flex justify-center">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg group"
          >
            {saving ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-6 h-6 transition-transform group-hover:scale-110" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}