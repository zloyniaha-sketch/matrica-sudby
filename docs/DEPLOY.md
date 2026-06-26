# Деплой, реквизиты и свой домен

## Реквизиты исполнителя (уже в коде)

| Поле | Значение |
|------|----------|
| ФИО | Емашова Татьяна Алексеевна |
| ИНН | 581004950962 |
| E-mail | dielvliv@gmail.com |
| Статус | плательщик НПД (самозанятость) |

Данные подставляются в оферту, политику конфиденциальности и подвал сайта. При сборке их можно переопределить через GitHub Secrets (не обязательно, если совпадают с кодом).

### GitHub Secrets (опционально)

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Значение |
|--------|----------|
| `SELLER_NAME` | Емашова Татьяна Алексеевна |
| `SELLER_INN` | 581004950962 |
| `CONTACT_EMAIL` | dielvliv@gmail.com |
| `YM_ID` | ID счётчика Яндекс.Метрики (когда подключите) |

---

## Свой домен: yourdestiny.tech

### Шаг 1. DNS у регистратора

Откройте панель домена → **DNS / Управление зоной**. Удалите лишние A/CNAME, если мешают.

### Шаг 2. DNS для GitHub Pages

В **Управление зоной DNS** добавьте записи:

**Корень домена (@)** — четыре A-записи:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Поддомен www** (по желанию):

| Тип | Имя | Значение |
|-----|-----|----------|
| CNAME | www | zloyniaha-sketch.github.io |

### Шаг 3. GitHub

1. Репозиторий [matrica-sudby](https://github.com/zloyniaha-sketch/matrica-sudby) → **Settings → Pages**.
2. **Custom domain** — введите `yourdestiny.tech` → **Save**.
3. Дождитесь **DNS check successful** (обычно 10 мин — 24 ч).
4. Включите **Enforce HTTPS**.

5. **Settings → Secrets and variables → Actions → Variables → New repository variable**:
   - Name: `CUSTOM_DOMAIN`
   - Value: `yourdestiny.tech` (без `https://`)

6. **Actions → Deploy GitHub Pages → Run workflow** (или push в `main`) — пересборка с новым URL.

После push в `main` сайт соберётся без `/matrica-sudby` в URL и с правильными canonical-ссылками.

### Шаг 4. Яндекс.Вебмастер и Google Search Console

После привязки домена добавьте сайт в [webmaster.yandex.ru](https://webmaster.yandex.ru/) и [search.google.com/search-console](https://search.google.com/search-console) — это ускорит индексацию.

---

## Юридический чеклист перед приёмом оплат

- [x] Публичная оферта на `/offer/`
- [x] Политика конфиденциальности (152-ФЗ) на `/privacy/`
- [x] Cookie-баннер перед Метрикой
- [x] Согласие перед оплатой (оферта + политика + цифровой контент)
- [x] Реквизиты исполнителя в документах и подвале
- [ ] Подключить **ЮKassa** (сейчас тестовый режим)
- [ ] Подключить **Яндекс.Метрику** → secret `YM_ID`
- [ ] **Уведомление Роскомнадзора** об обработке ПДн (если собираете email + Метрика): [pd.rkn.gov.ru](https://pd.rkn.gov.ru/operators-registry/notification/form/)

Чеки по НПД формируются в «Мой налог» или через интеграцию ЮKassa.

---

## Деплой

Push в ветку `main` → GitHub Actions собирает `web/` и публикует на Pages.

- Временный URL: https://zloyniaha-sketch.github.io/matrica-sudby/
- После настройки: https://yourdestiny.tech/
