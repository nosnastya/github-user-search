import React, { useState } from "react";
import styles from "./Select.module.scss"

export interface OptionComponentProps<T = any> {
    className?: string;
    options: Option<T>[];
    onChange(value: T, option?: Option<T>): void;
    defaultValue: T;
}

export function Select<T extends EntityValue>({ defaultValue, options, onChange, className}: OptionComponentProps<T>) {
    const [option, setOption] = useState(defaultValue);

    const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const { selectedIndex } = e.currentTarget;
        const selectedOption = options[selectedIndex];
        setOption(selectedOption.value);
        onChange(selectedOption.value);
    }

    return (
        <select
            value={option}
            onChange={handleOnChange}
            className={`${styles.select} ${className}`}
        >
            {options.map((option, id) =>
                <option
                    key={id}
                    value={option.value}
                >
                    {option.label}
                </option>
            )}
        </select>
    );
}
