---
layout: page
title: Produk Surendo
permalink: /produk/
---
## Semua Produk

### [Paket PJU Solarcell Standar]({{ '/product-category/pju-solarcell-stando/' | relative_url }})
<div class="cards">
{% for p in site.products %}{% for c in p.categories %}{% if c.slug == 'pju-solarcell-stando' %}{% include product-card.html p=p %}{% endif %}{% endfor %}{% endfor %}
</div>

### [PJU Solarcell All in One]({{ '/product-category/pju-solarcell-suritech-allinone/' | relative_url }})
<div class="cards">
{% for p in site.products %}{% for c in p.categories %}{% if c.slug == 'pju-solarcell-suritech-allinone' %}{% include product-card.html p=p %}{% endif %}{% endfor %}{% endfor %}
</div>

### [PJU Solarcell 2 In 1]({{ '/product-category/pju-solarcell-suritech-2-in-1/' | relative_url }})
<div class="cards">
{% for p in site.products %}{% for c in p.categories %}{% if c.slug == 'pju-solarcell-suritech-2-in-1' %}{% include product-card.html p=p %}{% endif %}{% endfor %}{% endfor %}
</div>
