import { ContentType } from './api'
import { Image } from './gallery'

/**
 * Рубрика
 */
export interface Category {
    /** Идентификатор */
    id: number,
    /** Является ли cпециальной категорией */
    is_custom: boolean,
    /** Наименование рубрики */
    title: string,
    /** Алиас */
    slug: string,
    /** URL изображения */
    image: string
}

/**
 * Материал из списка
 */
export interface MaterialList {
    /** Идентификатор */
    id: number,
    /** Дата и время в формате: [YYYY]-[MM]-[DD]T[hh]-[mm]-[ss] */
    datetime: string,
    /** Алиас */
    slug: string,
    /** Заголовок */
    title: string,
    /** Подводка */
    caption: string,
    /** Рубрика */
    category: Category,
    /** Тип материала */
    content_type: ContentType,
    /** Количество материалов */
    comments_cnt: number,
    /** Скрыт? */
    is_hidden: boolean,
    /** Галерея изображений (для обычных материалов 1 изображение, для фоторепортижей несколько) */
    images: Image[]
}