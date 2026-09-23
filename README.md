# GÖKKALE Arşivi

Bu depo [t1orstudios.github.io](https://t1orstudios.github.io/) adresindeki wikinin tamamını yayımlar. Site ve siyasi harita GitHub Pages üzerinden statik dosya olarak sunulur; ChatGPT Sites API'sinden veri çekmez.

## Maddeleri düzenleme

- Türkçe maddeler: [`data-tr.js`](data-tr.js)
- İngilizce maddeler: [`data-en.js`](data-en.js)
- Dosyaların başındaki `window.__wikiTR=` veya `window.__wikiEN=` önekini ve sondaki noktalı virgülü koruyun. Maddeler aynı `slug` anahtarıyla iki dosyada tutulur. Mevcut alanları (`title`, `category`, `desc`, `lead`, `facts`, `sections`, `related`, `imageKey`, `draft`) izleyin.
- Fotoğraf eklemek için `.png`, `.jpg`, `.jpeg` veya `.webp` dosyasını bu deponun köküne yükleyin. Maddenin `imageKey` alanını örneğin `file:birlik-fotografi.png` yapın. İsterseniz katalogdaki mevcut `patch-demir-iz` gibi anahtarları da kullanabilirsiniz.
- GitHub değişiklikleri kaydedilip Pages dağıtımı bitince yayında görünür. Yalnızca depoya yazma yetkisi olan hesaplar değişiklik yapabilir.

Arayüz `index.html`, `pages.js` ve `style.css`; siyasi harita `harita.html`, `harita-en.html`, `map.js` ve `map.css` dosyalarında bulunur. Görseller ve madde verileri aynı depodadır. Eski e-posta/şifreli yönetici paneli GitHub Pages üzerinde çalışmaz; yönetici yetkisi GitHub depo erişimiyle yönetilir.
