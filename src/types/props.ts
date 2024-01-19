export type WithEvents<Props extends object = object> =
    & Props
    & {
        events?: Record<string, EventListener | undefined>,
    }

export interface Image {
    name: string,
    path: string,
}
