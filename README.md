# GÖKKALE Arşivi

Bu depo [t1orstudios.github.io](https://t1orstudios.github.io/) adresindeki wikinin tamamını yayımlar. Site ve siyasi harita GitHub Pages üzerinden statik dosya olarak sunulur; ChatGPT Sites API'sinden veri çekmez.

## Maddeleri düzenleme

[Yönetici paneli](https://t1orstudios.github.io/edit.html) üzerinden maddeleri ve görselleri düzenleyebilirsin. Depoya yazma yetkisi olan bir GitHub hesabı ve yalnızca bu depo için `Contents: Read and write` izni olan ince kapsamlı erişim anahtarı gerekir. Anahtar sekmenin belleğinde kalır; site dosyalarına yazılmaz. Panel tek commit ile iki dilin JSON kopyalarını, `pages.js` ve önbellek sürümünü günceller.

Elle düzenleme için:

- Türkçe maddeler: [`pages.js`](pages.js) içindeki `const dataTR=`
- İngilizce maddeler: [`pages.js`](pages.js) içindeki `const dataEN=`
- Maddeler aynı `slug` anahtarıyla iki dilde tutulur. Mevcut alanları (`title`, `category`, `desc`, `lead`, `facts`, `sections`, `related`, `imageKey`, `draft`) izleyin.
- Fotoğraf eklemek için `.png`, `.jpg`, `.jpeg` veya `.webp` dosyasını bu deponun köküne yükleyin. Maddenin `imageKey` alanını örneğin `file:birlik-fotografi.png` yapın. İsterseniz katalogdaki mevcut `patch-demir-iz` gibi anahtarları da kullanabilirsiniz.
- GitHub değişiklikleri kaydedilip Pages dağıtımı bitince yayında görünür. Yalnızca depoya yazma yetkisi olan hesaplar değişiklik yapabilir.

Arayüz `index.html`, `pages.js` ve `style.css`; siyasi harita `harita.html`, `harita-en.html`, `map.js` ve `map.css` dosyalarında bulunur. Görseller ve madde verileri aynı depodadır. Eski e-posta/şifreli yönetici paneli GitHub Pages üzerinde çalışmaz; yönetici yetkisi GitHub depo erişimiyle yönetilir. `t1orstudios/skyfortress` ayrı bir kaynak deposudur; oradaki commit tek başına yayını güncellemez.
