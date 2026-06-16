"use client";

import { API_URL } from "../../lib/api";

import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../components/Navbar";

import { uploadImage as uploadImageToGcs } from "../../lib/upload/uploadImage";

import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [imagePreview, setImagePreview] = useState<string>("");

  const [form, setForm] = useState<any>({
    imageKey: "",

    displayName: "",

    bio: "",

    age: null,

    gender: "",

    country: "",

    region: "",

    city: "",

    occupation: "",

    education: "",

    relationshipGoals: "",

    website: "",

    instagram: "",

    interests: [],

    languages: [],

    showAge: true,

    showLocation: true,

    showInterests: true,

    showEducation: true,

    showOccupation: true,

    showLanguages: true,

    showSocials: false,
  });

  const [interestInput, setInterestInput] = useState("");

  const [languageInput, setLanguageInput] = useState("");

  async function fetchMe() {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [meResponse, profileResponse] = await Promise.all([
        axios.get(`${API_URL}/auth/me`, { headers }),
        axios.get(`${API_URL}/profile/me`, { headers }),
      ]);

      const userData = meResponse.data.user;

      setUser(userData);

      const profile = {
        ...(profileResponse.data || {}),
      };

      setImagePreview(profile.imageUrl || "");

      setForm((prev: any) => ({
        ...prev,

        imageKey: profile.imageKey ?? prev.imageKey,

        displayName: profile.displayName ?? prev.displayName,

        bio: profile.bio ?? prev.bio,

        age: profile.age ?? prev.age,

        gender: profile.gender ?? prev.gender,

        country: profile.country ?? prev.country,

        region: profile.region ?? prev.region,

        city: profile.city ?? prev.city,

        occupation: profile.occupation ?? prev.occupation,

        education: profile.education ?? prev.education,

        relationshipGoals: profile.relationshipGoals ?? prev.relationshipGoals,

        website: profile.website ?? prev.website,

        instagram: profile.instagram ?? prev.instagram,

        interests: profile.interests ?? prev.interests,

        languages: profile.languages ?? prev.languages,

        showAge: profile.showAge ?? prev.showAge,

        showLocation: profile.showLocation ?? prev.showLocation,

        showInterests: profile.showInterests ?? prev.showInterests,

        showEducation: profile.showEducation ?? prev.showEducation,

        showOccupation: profile.showOccupation ?? prev.showOccupation,

        showLanguages: profile.showLanguages ?? prev.showLanguages,

        showSocials: profile.showSocials ?? prev.showSocials,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function saveProfile() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/profile/me`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.imageUrl) {
        setImagePreview(res.data.imageUrl);
      }

      await fetchMe();

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(e: any) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      setUploading(true);
      setUploadProgress(0);
      const { key } = await uploadImageToGcs(file, "profile", {
        onProgress: setUploadProgress,
      });
      setForm((prev: any) => ({ ...prev, imageKey: key }));
      setImagePreview(URL.createObjectURL(file));
    } catch (err: any) {
      alert(err?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function getImageUrl() {
  if (!imagePreview || imagePreview === "null") {
    return "https://placehold.co/400x400/18181b/ffffff?text=Profile";
  }

  return imagePreview.startsWith("http")
    ? imagePreview
    : `${API_URL}${imagePreview}`;
}

  function updateField(key: string, value: any) {
    setForm((prev: any) => ({
      ...prev,

      [key]: value,
    }));
  }

  function addInterest() {
    if (!interestInput.trim()) {
      return;
    }

    updateField("interests", [...form.interests, interestInput.trim()]);

    setInterestInput("");
  }

  function removeInterest(value: string) {
    updateField(
      "interests",
      form.interests.filter((item: string) => item !== value),
    );
  }

  function addLanguage() {
    if (!languageInput.trim()) {
      return;
    }

    updateField("languages", [...form.languages, languageInput.trim()]);

    setLanguageInput("");
  }

  function removeLanguage(value: string) {
    updateField(
      "languages",
      form.languages.filter((item: string) => item !== value),
    );
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
          {/* HEADER */}

          <div className="mb-10 flex flex-col items-center text-center">
            <img
              src={getImageUrl()}
              alt="Profile"
              className="mb-5 h-32 w-32 rounded-full border border-zinc-700 object-cover object-top sm:h-40 sm:w-40"
            />

            <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
              {form.displayName || user.username}
            </h1>

            <p className="text-zinc-400">{user.email}</p>
          </div>

          {/* IMAGE */}

          <div className="mb-8">
            <label className="mb-3 block text-sm text-zinc-400">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full text-sm text-zinc-300"
            />

            {uploading && (
              <div className="mt-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-pink-500 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Uploading… {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          {/* FORM */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Display Name"
              value={form.displayName}
              onChange={(v) => updateField("displayName", v)}
            />

            <Input
              label="Gender"
              value={form.gender}
              onChange={(v) => updateField("gender", v)}
            />

            <Input
              label="Age"
              type="number"
              value={form.age ?? ""}
              onChange={(v) => updateField("age", v === "" ? null : Number(v))}
            />

            <Input
              label="Relationship Goals"
              value={form.relationshipGoals}
              onChange={(v) => updateField("relationshipGoals", v)}
            />

            <Input
              label="Country"
              value={form.country}
              onChange={(v) => updateField("country", v)}
            />

            <Input
              label="Region"
              value={form.region}
              onChange={(v) => updateField("region", v)}
            />

            <Input
              label="City"
              value={form.city}
              onChange={(v) => updateField("city", v)}
            />

            <Input
              label="Occupation"
              value={form.occupation}
              onChange={(v) => updateField("occupation", v)}
            />

            <Input
              label="Education"
              value={form.education}
              onChange={(v) => updateField("education", v)}
            />

            <Input
              label="Website"
              value={form.website}
              onChange={(v) => updateField("website", v)}
            />

            <Input
              label="Instagram"
              value={form.instagram}
              onChange={(v) => updateField("instagram", v)}
            />
          </div>

          {/* BIO */}

          <div className="mt-6">
            <label className="mb-3 block text-sm text-zinc-400">Bio</label>

            <textarea
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 p-4 outline-none"
            />
          </div>

          {/* INTERESTS */}

          <div className="mt-8">
            <label className="mb-3 block text-sm text-zinc-400">
              Interests
            </label>

            <div className="mb-4 flex gap-3">
              <input
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
              />

              <button
                onClick={addInterest}
                className="rounded-2xl bg-white px-5 font-bold text-black"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.interests.map((interest: string) => (
                <button
                  key={interest}
                  onClick={() => removeInterest(interest)}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2"
                >
                  {interest} ✕
                </button>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}

          <div className="mt-8">
            <label className="mb-3 block text-sm text-zinc-400">
              Languages
            </label>

            <div className="mb-4 flex gap-3">
              <input
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
              />

              <button
                onClick={addLanguage}
                className="rounded-2xl bg-white px-5 font-bold text-black"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.languages.map((language: string) => (
                <button
                  key={language}
                  onClick={() => removeLanguage(language)}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2"
                >
                  {language} ✕
                </button>
              ))}
            </div>
          </div>

          {/* PRIVACY */}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Toggle
              label="Show Age"
              checked={form.showAge}
              onChange={() => updateField("showAge", !form.showAge)}
            />

            <Toggle
              label="Show Location"
              checked={form.showLocation}
              onChange={() => updateField("showLocation", !form.showLocation)}
            />

            <Toggle
              label="Show Interests"
              checked={form.showInterests}
              onChange={() => updateField("showInterests", !form.showInterests)}
            />

            <Toggle
              label="Show Education"
              checked={form.showEducation}
              onChange={() => updateField("showEducation", !form.showEducation)}
            />

            <Toggle
              label="Show Occupation"
              checked={form.showOccupation}
              onChange={() =>
                updateField("showOccupation", !form.showOccupation)
              }
            />

            <Toggle
              label="Show Languages"
              checked={form.showLanguages}
              onChange={() => updateField("showLanguages", !form.showLanguages)}
            />

            <Toggle
              label="Show Socials"
              checked={form.showSocials}
              onChange={() => updateField("showSocials", !form.showSocials)}
            />
          </div>

          {/* SECURITY */}

          <div className="mt-10 border-t border-zinc-800 pt-8">
            <h2 className="mb-5 text-2xl font-bold">Security</h2>

            <a
              href="/change-password"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 px-6 py-4 font-semibold transition hover:bg-zinc-700"
            >
              Change Password
            </a>
          </div>

          {/* SAVE */}

          <button
            onClick={saveProfile}
            disabled={loading || uploading}
            className="mt-10 w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:bg-zinc-200"
          >
            {uploading
              ? "Uploading..."
              : loading
                ? "Saving..."
                : "Save Profile"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center justify-between rounded-2xl border p-4 transition ${
        checked
          ? "border-white bg-white text-black"
          : "border-zinc-700 bg-zinc-900 text-white"
      } `}
    >
      <span>{label}</span>

      <span>{checked ? "ON" : "OFF"}</span>
    </button>
  );
}
