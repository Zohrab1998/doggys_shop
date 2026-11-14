"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ANIMAL_TYPE_OPTIONS, CATEGORY_OPTIONS } from "@/lib/catalog";

export type ProductFormValues = {
  id: string;
  name: string;
  description: string;
  priceAmd: number;
  animalType: string;
  category: string;
  brand: string;
  inStock: boolean;
  imageUrl: string;
};

const label = "block text-xs font-bold tracking-wider text-brand-navy/70 uppercase";
const field =
  "mt-1 w-full rounded-xl border border-brand-blue/20 bg-white px-4 py-2.5 text-sm text-brand-navy outline-none focus:border-brand-blue";

export default function ProductForm({ product, brands }: { product?: ProductFormValues; brands: string[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const hasUpload = product?.imageUrl.startsWith("/api/product-image/") ?? false;
  const currentImage = preview ?? product?.imageUrl ?? "";

  async function send(method: "POST" | "PATCH" | "DELETE", body?: FormData) {
    setSaving(true);
    setMessage(null);
    try {
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const res = await fetch(url, { method, body });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.message ?? "Something went wrong.");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      setSaving(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(product ? "PATCH" : "POST", new FormData(event.currentTarget));
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-6 rounded-2xl bg-white p-5 shadow-sm sm:p-7 md:grid-cols-[1fr_260px]">
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={label}>
            Product name
          </label>
          <input id="name" name="name" required maxLength={150} defaultValue={product?.name} className={field} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="animalType" className={label}>
              Animal
            </label>
            <select id="animalType" name="animalType" required defaultValue={product?.animalType ?? ""} className={field}>
              <option value="" disabled>
                Choose…
              </option>
              {ANIMAL_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className={label}>
              Category
            </label>
            <select id="category" name="category" required defaultValue={product?.category ?? ""} className={field}>
              <option value="" disabled>
                Choose…
              </option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="priceAmd" className={label}>
              Price (AMD)
            </label>
            <input
              id="priceAmd"
              name="priceAmd"
              type="number"
              required
              min={1}
              step={1}
              defaultValue={product?.priceAmd}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="brand" className={label}>
              Brand (optional)
            </label>
            <input id="brand" name="brand" list="brand-list" maxLength={80} defaultValue={product?.brand} className={field} />
            <datalist id="brand-list">
              {brands.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label htmlFor="description" className={label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            maxLength={5000}
            defaultValue={product?.description}
            className={field}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-bold text-brand-navy">
          <input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} className="h-4 w-4" />
          In stock (customers can buy it)
        </label>
      </div>

      <div className="space-y-4">
        <p className={label}>Photo</p>
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-brand-sky text-sm text-brand-navy/50">
          {currentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentImage} alt="" className="h-full w-full object-cover" />
          ) : (
            "No photo yet"
          )}
        </div>
        <div>
          <label htmlFor="image" className={label}>
            Upload a photo
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="mt-1 w-full text-sm text-brand-navy file:mr-3 file:rounded-full file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
          />
          <p className="mt-1 text-xs text-brand-navy/50">JPG, PNG, WebP or GIF, up to 4 MB. Square photos look best.</p>
        </div>
        <div>
          <label htmlFor="imageUrl" className={label}>
            …or paste an image link
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://"
            defaultValue={hasUpload ? "" : product?.imageUrl}
            className={field}
          />
        </div>
        {product?.imageUrl ? (
          <label className="flex items-center gap-2 text-sm text-brand-navy">
            <input type="checkbox" name="removeImage" className="h-4 w-4" />
            Remove the current photo
          </label>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-brand-sky pt-5 md:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-orange px-8 py-3 text-sm font-extrabold text-white transition hover:bg-brand-orange-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : product ? "Save changes" : "Add product"}
        </button>
        <Link href="/admin/products" className="rounded-full px-5 py-3 text-sm font-bold text-brand-navy hover:bg-brand-sky">
          Cancel
        </Link>

        {product ? (
          <button
            type="button"
            disabled={saving}
            onClick={() => (confirmDelete ? void send("DELETE") : setConfirmDelete(true))}
            className={`ml-auto rounded-full px-5 py-3 text-sm font-bold transition ${
              confirmDelete ? "bg-red-600 text-white hover:bg-red-700" : "text-red-600 hover:bg-red-50"
            }`}
          >
            {confirmDelete ? "Yes, delete this product" : "Delete product"}
          </button>
        ) : null}

        {message ? (
          <p role="alert" className="w-full text-sm font-bold text-red-600">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
