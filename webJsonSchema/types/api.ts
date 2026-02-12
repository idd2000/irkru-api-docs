
export interface ContentType {
  /** Идентификатор */
  id: number,
  /** Наименование приложения */
  app_label: string,
  /** Наименование модели */
  model: string,
  /** Составной ключ "app_label.model" */
  key: string
}