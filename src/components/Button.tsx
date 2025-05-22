export type ButtonPropsType = {
    title?: string
    onClick?: () => void
    className?: string
    disabledButton?: boolean | undefined
    style?: React.CSSProperties | undefined
}

export const Button = ({title, onClick, className, style, disabledButton}: ButtonPropsType) => {


    return (
        <button className={className} onClick={onClick} style={style} disabled={disabledButton}>
            {title}
        </button>
    );
};
