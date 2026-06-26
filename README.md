# Матрица Судьбы

Веб-калькулятор матрицы судьбы по дате рождения: 12 сфер, чакры, прогноз на 10 лет, совместимость, PDF-отчёт.

## Локальный запуск

```bash
cd web
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Деплой

Сайт публикуется на **GitHub Pages** через Actions при push в `main`.

После деплоя: `https://zloyniaha-sketch.github.io/matrica-sudby/`

### Первый деплой

1. Репозиторий: [github.com/zloyniaha-sketch/matrica-sudby](https://github.com/zloyniaha-sketch/matrica-sudby)
2. **Settings → Pages → Build and deployment → Source:** GitHub Actions
3. Push в `main` — workflow соберёт `web/` и задеплоит

Реквизиты, свой домен и чеклист по закону: [docs/DEPLOY.md](docs/DEPLOY.md)

## Стек

- Next.js 15 (static export)
- TypeScript, Tailwind CSS
- [destiny-matrix-core](https://www.npmjs.com/package/destiny-matrix-core) — расчёт точек матрицы
