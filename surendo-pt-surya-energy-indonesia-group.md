---
layout: page
title: "Gallery SURENDO PT. SURYA ENERGY INDONESIA GROUP"
permalink: /surendo-pt-surya-energy-indonesia-group/
wp_id: 117
---

<h2>Gallery SURENDO PT. SURYA ENERGY INDONESIA GROUP</h2>

<p>Dokumentasi pabrikasi, instalasi, dan produk PT. Surya Energy Indonesia Group.</p>

<div class="gallery">
{% for img in site.data.gallery %}
  <a href="{{ img.src | relative_url }}" target="_blank" rel="noopener"><img src="{{ img.src | relative_url }}" alt="{{ img.alt }}" title="{{ img.title }}" loading="lazy" /></a>
{% endfor %}
</div>
