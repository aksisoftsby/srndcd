---
layout: default
title: "SURENDO - CV. SURYA ENERGY INDONESIA"
permalink: /
wp_id: 144
excerpt: "Pabrikasi tiang Penerangan Jalan Umum (PJU) dan Energi Terbarukan sejak 2008. PJU Solarcell, PLTS On/Off Grid, Hybrid, Pompa Lorentz."
---

{% include slider.html %}

<h3>Surya Energy Indonesia (SURENDO)</h3>
		<p>Kami adalah perusahaan yang bergerak dibidang pabrikasi tiang Penerangan Jalan Umum dan Energi Terbarukan. Melalui perkembangan teknologi yang terus berkembang, kami berusaha memenuhi kebutuhan akan sumber daya energi alternatif yang bisa dimanfaatkan secara berkelanjutan. Kami dipercaya sebagai penyedia energi terbarukan sejak tahun 2008 dan produk kami telah terpakai di seluruh pelosok Indonesia.<br></p>
												<img width="657" height="1024" src="/assets/uploads/2019/02/buku-a3-2019_Page2-657x1024.png" alt="" decoding="async" loading="lazy" />
			<h2>Produk Surendo</h2>
									<figure>
											<a href="https://surendo.co.id/product-category/pju-solarcell-stando/">
							<img width="843" height="914" src="/assets/uploads/2021/07/PJUTS-STANDO-LOGO-944x1024.jpg" alt="" decoding="async" loading="lazy" />								</a>
											<figcaption>Paket PJU Solarcell 3 In 1 / Konvensional</figcaption>
										</figure>
									<figure>
											<a href="http://product-category/pju-tenaga-surya/">
							<img width="300" height="278" src="/assets/uploads/2021/07/AIO-LOGO-300x278.jpg" alt="" decoding="async" loading="lazy" />								</a>
											<figcaption>Paket PJU Solarcell ALL IN ONE</figcaption>
										</figure>
									<figure>
											<a href="/product-category/pju-solarcell-suritech-2-in-1">
							<img width="843" height="560" src="/assets/uploads/2021/07/2-in-1-LOGO-1024x680.jpg" alt="SOLARCELL" decoding="async" loading="lazy" />								</a>
											<figcaption>Paket PJU Solarcell Two in One</figcaption>
										</figure>
									<figure>
											<a href="https://surendo.co.id/product-category/warninglight-solarcell/">
							<img width="843" height="690" src="/assets/uploads/2019/03/Warninglight-1024x838.jpg" alt="" decoding="async" loading="lazy" />								</a>
											<figcaption>Paket Warning Light Solarcell</figcaption>
										</figure>
<div class="video"><iframe src="https://www.youtube.com/embed/_SDbOHIU8Gk" title="Video SURENDO" frameborder="0" allowfullscreen loading="lazy"></iframe></div>
			<h2>Our Client</h2>
												<img width="101" height="74" src="/assets/uploads/2019/02/client-1.jpg" alt="" decoding="async" loading="lazy" />
												<img width="85" height="84" src="/assets/uploads/2019/02/client-2.jpg" alt="" decoding="async" loading="lazy" />
												<img width="88" height="79" src="/assets/uploads/2019/02/client-3.jpg" alt="" decoding="async" loading="lazy" />
												<img width="79" height="89" src="/assets/uploads/2019/02/client-4.jpg" alt="" decoding="async" loading="lazy" />
												<img width="97" height="84" src="/assets/uploads/2019/02/client-5.jpg" alt="" decoding="async" loading="lazy" />
												<img width="94" height="117" src="/assets/uploads/2019/02/client-6.jpg" alt="" decoding="async" loading="lazy" />
												<img width="79" height="100" src="/assets/uploads/2019/02/client-7.jpg" alt="" decoding="async" loading="lazy" />
												<img width="160" height="52" src="/assets/uploads/2019/02/client-8.jpg" alt="" decoding="async" loading="lazy" />
												<img width="91" height="74" src="/assets/uploads/2019/02/client-9.jpg" alt="" decoding="async" loading="lazy" />
												<img width="172" height="46" src="/assets/uploads/2019/02/client-10.jpg" alt="" decoding="async" loading="lazy" />
			<h6>Kontak Surendo</h6>
			<h6><a href="tel:0318783440">031 8783440</a></h6>
			<h3>Jl. Raya Medayu Utara Kav. 27 Rungkut Surabaya.</h3>
					<a target="_blank" rel="noopener">
<p>Facebook</p>
											</a>
					<a href="https://www.instagram.com/suryaenergyindonesia" target="_blank" rel="noopener">
<p>Instagram</p>
											</a>
					<a href="https://www.youtube.com/channel/UCxaUL2eb_05u2WzZOkj2h4w" target="_blank" rel="noopener">
<p>Youtube</p>
											</a>

<h2>Produk Unggulan</h2>

<div class="cards">
{% for prod in site.products limit:8 %}{% include product-card.html p=prod %}{% endfor %}
</div>

<p><a class="btn" href="{{ '/produk/' | relative_url }}">Lihat Semua Produk</a></p>

<h2>Kategori Produk</h2>

<ul class="cat-list">
{% for cat in site.data.categories %}{% if cat.url contains '/product-category/' %}<li><a href="{{ cat.url | relative_url }}">{{ cat.name }}</a> ({{ cat.count }})</li>{% endif %}{% endfor %}
</ul>
