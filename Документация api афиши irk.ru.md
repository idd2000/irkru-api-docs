## Порядок обращения с api
При получении списка объектов будет возвращаться JSON вида:
```
{
	"count": 48434,
	"next": "http://localhost:8000/api/1/afisha/events/?page=2",
	"previous": null,
	"results": [
		{
			"title": "Такси 3",
			"caption": ""
		},
		{
			"title": "Такси 3",
			"caption": ""
		}
	]
}
```

Где:
count — общее количество объектов
next и previous — ссылки на след. или пред. страницу если она есть, если нет то в значении будет null
results — список объектов возвращаемый api
Далее будут описываться только поля объекта api и приведены примеры полностью

## Список событий

https://www.irk.ru/api/1/afisha/events/

Возвращает список событий:
```
{
	"count": 48434,
	"next": "http://localhost:8000/api/1/afisha/events/?page=2",
	"previous": null,
	"results": [
		{
			"title": "Такси 3",
			"caption": ""
		},
		{
			"title": "Такси 3",
			"caption": ""
		}
	]
}
```

sadasd