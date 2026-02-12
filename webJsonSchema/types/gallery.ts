
export interface Image {
  /** Ширина */
  width: number,
  /** Высота */
  height: number,
  /** Путь к изображению */
  image: string,
  /** Подпись к изображению */
  title: string,
  /** Главное фото в галерее */
  is_main: boolean
}