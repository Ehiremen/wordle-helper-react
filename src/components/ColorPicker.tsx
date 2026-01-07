import React from 'react';
import '../css/ColorPicker.css';
import dropper from '../assets/dropper.svg';
import { CellColor, ColorPickerProps } from '../interface';

function ColorPicker(props: ColorPickerProps) {
    return (
        <div className='Color-picker-div'>
            <img
                className='Cell-dropper-img'
                src={dropper}
                alt='color picker'
                onClick={() =>
                    props.onClickColorPicker(props.showColorDropdown)
                }
            />
            {Object.values(CellColor)
                .filter((c) => c !== props.color) // show colors except the current one
                .map(
                    (c) =>
                        props.showColorDropdown && (
                            <div
                                className='Color-preview-square'
                                key={c}
                                style={{ backgroundColor: c }}
                                onClick={() => props.onChangeColor(c)}
                            ></div>
                        )
                )}
        </div>
    );
}

export default ColorPicker;
