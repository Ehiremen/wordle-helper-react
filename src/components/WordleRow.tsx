import React, { useState } from 'react';
import Cell from './Cell';
import '../css/WordleRow.css';
import { CellColor, CellProps, WordleRowProps } from '../interface';

function WordleRow(props: WordleRowProps) {
    const useCellProps = (index: number): CellProps => {
        const [value, setValue] = useState('');
        const [color, setColor] = useState(CellColor.gray);
        const [isLocked, setIsLocked] = useState(false);

        return {
            indexInRow: index,
            dictionaryStateMutators: props.dictionaryStateMutators,
            value,
            color,
            isLocked,
            cellStateMutators: { setColor, setValue, setIsLocked },
        };
    };
    const cells: CellProps[] = [
        useCellProps(0),
        useCellProps(1),
        useCellProps(2),
        useCellProps(3),
        useCellProps(4),
    ];

    const [isApplyBtnActive, setIsApplyBtnActive] = useState(true);
    const onClickApplyBtn = () => {
        cells.forEach((cell, i) => {
            markColorInDictionary(cell.value, cell.color, i);
            cell.cellStateMutators.setIsLocked(!cell.isLocked);
        });
        props.dictionaryStateMutators.onUpdateDictionary();
        setIsApplyBtnActive(!isApplyBtnActive);
    };

    const markColorInDictionary = (
        val: string,
        col: CellColor,
        index: number
    ) => {
        val = val.trim().toUpperCase();
        if (val === '') return;

        switch (col) {
            case CellColor.gray:
                props.dictionaryStateMutators.onSetLetterGray(val);
                break;
            case CellColor.green:
                props.dictionaryStateMutators.onSetLetterGreen(val, index);
                break;
            case CellColor.yellow:
                props.dictionaryStateMutators.onSetLetterYellow(val, index);
                break;
            default:
                break;
        }
    };

    return (
        <div className='Wordle-row'>
            {cells.map((cell, i) => (
                <Cell
                    key={i}
                    dictionaryStateMutators={cell.dictionaryStateMutators}
                    value={cell.value}
                    indexInRow={cell.indexInRow}
                    color={cell.color}
                    isLocked={cell.isLocked}
                    cellStateMutators={cell.cellStateMutators}
                />
            ))}
            {isApplyBtnActive && (
                <button className='Apply-btn' onClick={onClickApplyBtn}>
                    Apply
                </button>
            )}
        </div>
    );
}

export default WordleRow;
