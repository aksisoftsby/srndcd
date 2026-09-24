# surendo.co.id — GitHub Pages

Situs statis pengganti WordPress/WooCommerce **surendo.co.id** (URL asli dipertahankan:
`/product/...`, `/product-category/...`, `/download/...`, `/profil/`, `/hubungi-kami/`, dst).

## Struktur

| Path | Keterangan |
|---|---|
| `_config.yml` | konfigurasi Jekyll (permalink, collections, plugin) |
| `_layouts/`, `_includes/` | template (head, header, nav, footer, kartu produk, slider, form) |
| `_data/` | `navigation.yml`, `categories.yml`, `sliders.yml`, `gallery.yml` |
| `_products/` | produk (`/product/:slug/`) |
| `product-category/` | kategori produk (`/product-category/:slug/`) |
| `_downloads/` | katalog & brosur (`/download/:slug/`) |
| `_posts/` | berita/blog |
| `assets/uploads/` | media migrasi dari `wp-content/uploads` |
| `assets/gallery/` | galeri NextGEN (`wp-content/gallery`) |
| `download/` | berkas PDF unduhan |
| `assets/css`, `assets/js`, `assets/img` | aset tema + gambar situs |

## Deploy ke GitHub Pages

1. Push repo (branch `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Workflow `.github/workflows/pages.yml` build (`bundle exec jekyll build`) + deploy;
   hasil build dapat dilihat di tab **Actions**.
4. Custom domain: **Settings → Pages → Custom domain** = `surendo.co.id`
   (file `CNAME` sudah disertakan) lalu aktifkan **Enforce HTTPS**.
   DNS: `A` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   (opsional `CNAME www` → `<user>.github.io`).

Build lokal:

```bash
bundle install
bundle exec jekyll serve      # http://127.0.0.1:4000
```

## Catatan

- Form kontak memakai Formspree — isi `formspree_id` di `_config.yml`
  (placeholder `YOUR_FORM_ID`). Contact Form 7 tidak berjalan di situs statis.
- Gambar produk yang belum tersedia lokal otomatis jatuh ke sumber asli
  (`https://surendo.co.id/...`) lewat atribut `onerror` di `_includes/product-card.html`.
- Plugin: `jekyll-sitemap`, `jekyll-seo-tag`, `jekyll-feed`.

