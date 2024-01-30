export interface ButtonProps {
    onClick?: EventListener,
    label: string,
    page?: string,
    type?: 'primary' | 'critical' | 'link',
    disabled?: boolean,
}
