import * as React from "react";

type InputPropsType = {
    className?: string;
    style?: React.CSSProperties | undefined;
    value?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void
};


export const Input = ({className, style, value, onChange}:InputPropsType) => {
    return (
        <input className={className} style={style} type={"number"} value={value} onChange={onChange}/>
    );
};