export type RadioButtonProps = {
    defaultValue: string,
    onValueChange: (value: string) => void,
    className?: string
    options: Array <{
        value: string,
        label: string
    }>
}