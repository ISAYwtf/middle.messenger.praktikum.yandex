export interface ButtonProps {
    onClick?: EventListener,
    label: string,
    page?: string,
    type?: 'primary' | 'link',
    disabled?: boolean,
}
