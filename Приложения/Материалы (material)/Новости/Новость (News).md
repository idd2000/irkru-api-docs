endpoint url: `/api/1/material/news/`

# List
`GET https://www.irk.ru/api/1/material/news/`
Ответ:

```
{
	"next": "https://www.irk.ru/api/1/news/?page=2",
	"previous": null,
	"today": "2026-02-02",
	"results": [
		{
			"id": 142375,
			"datetime": "2026-01-18T21:03:47",
			"slug": "search",
			"title": "В Иркутске разыскивают пропавшую 38-летнюю Галину Двоеглазову",
			"caption": "14 января женщина ушла из дома и не вернулась. В дежурную часть обратился ее сожитель.",
			"category": 6,
			"content_type_id": 67,
			"comments_cnt": 15,
			"is_hidden": false,
			"images": [
				{
					"width": 940,
					"image": "/media/img/site/gallery/3648/7e212359-fe5a-4a27-98de-e4174c2b1b91.jpg",
					"title": "Галина Двоеглазова. Фото из телеграм-канала ГУ МВД России по Иркутской области",
					"is_main": true,
					"height": 626
				}
			]
		}
	]
}
```

# Get
`GET https://www.irk.ru/api/1/material/news/<id>/`

Ответ:
```
{
	"id": 142375,
	"datetime": "2026-01-18T21:03:47",
	"slug": "search",
	"title": "В Иркутске разыскивают пропавшую 38-летнюю Галину Двоеглазову",
	"caption": "14 января женщина ушла из дома и не вернулась. В дежурную часть обратился ее сожитель.",
	"category": 6,
	"content_type_id": 67,
	"comments_cnt": 15,
	"is_hidden": false,
	"author": "",
	"category_title": "Происшествия",
	"content": "<p>В Иркутске разыскивают пропавшую 38-летнюю Галину Двоеглазову</p>"
}
```