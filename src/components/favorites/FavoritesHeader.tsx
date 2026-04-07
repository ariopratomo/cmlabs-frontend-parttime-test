import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function FavoritesHeader() {
  return (
    <header className="mb-10 rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
      <div className="mb-4">
        <Breadcrumb items={[{ label: "Ingredients", href: "/" }, { label: "Favorit Saya" }]} />
      </div>
      <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
        Koleksi Pribadi
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Favorit Saya
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        Ingredient dan meal yang sudah kamu simpan — tersimpan di browser lokal.
      </p>
    </header>
  );
}
