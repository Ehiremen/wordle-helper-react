import React, { useState } from 'react';
import { CellColor, CellProps } from '../interface';
import '../css/Cell.css';
import ColorPicker from './ColorPicker';

function Cell(props: CellProps) {
    const [showColorDropdown, setShowColorDropdown] = useState(false);

    const isLetter = (char: string) => {
        let code = char.charCodeAt(0);
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    };

    const onChangeColor = (col: CellColor) => {
        props.cellStateMutators.setColor(col);
        setShowColorDropdown(!showColorDropdown);
    };

    const onClickColorPicker = (showColorDropdown: boolean) => {
        setShowColorDropdown(!showColorDropdown);
    };

    return (
        <div className='Wordle-cell' style={{ backgroundColor: props.color }}>
            {props.isLocked && (
                <span className='Cell-text-field'>{props.value}</span>
            )}
            {!props.isLocked && (
                <input
                    type='text'
                    maxLength={1}
                    value={props.value}
                    className='Cell-text-field'
                    onChange={(event) => {
                        const newValue = event.target.value.toUpperCase();
                        if (isLetter(newValue)) {
                            props.cellStateMutators.setValue(newValue);
                        }
                    }}
                />
            )}
            {!props.isLocked && (
                <ColorPicker
                    color={props.color}
                    showColorDropdown={showColorDropdown}
                    onChangeColor={onChangeColor}
                    onClickColorPicker={onClickColorPicker}
                />
            )}
        </div>
    );
}

export default Cell;
