Генератор будет использоваться для повышение удобства документирования, а так же дает возможность получить готовый тип для TypeScript.

Для создания нового типа нужно:
1) yarn install / npm install
2) В папке `/webJsonSchema/types/` создать новый тип (при необходимости можно создать его в новом файле)
3) В файле `/webJsonSchema/types/models.ts` импортировать новый тип и добавить в Main его
4) Далее есть 2 варианта действий:
	1) для локального просмотра можно запустить `npm run dev` / `yarn run dev`
	2) для публикации нужно:
		1) выполнить `npm run build` / `yarn run build`
		2) запушить в main
		3) вмержить в ветку `gh-pages`
		4) смотреть результат на `https://idd2000.github.io/irkru-api-docs/dist/`


> [! ]
> В документации будут встречаться ссылки например [Category](https://idd2000.github.io/irkru-api-docs/dist/?search=Category)
