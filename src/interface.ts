import Dictionary from './utils/dict-logic';

export enum CellColor {
    gray = '#3a3a3c',
    green = '#538d4e',
    yellow = '#b59f3b',
}

export interface DictionaryStateMutators {
    onSetLetterGray: Function;
    onSetLetterGreen: Function;
    onSetLetterYellow: Function;
    onUpdateDictionary: Function;
}

interface CellStateMutators {
    setValue: Function;
    setColor: Function;
    setIsLocked: Function;
}

export interface CellProps {
    indexInRow: number;
    value: string;
    color: CellColor;
    isLocked: boolean;
    dictionaryStateMutators: DictionaryStateMutators;
    cellStateMutators: CellStateMutators;
}

export interface ColorPickerProps {
    color: CellColor;
    onChangeColor: Function;
    onClickColorPicker: Function;
    showColorDropdown: boolean;
}

export interface WordleRowProps {
    dictionaryStateMutators: DictionaryStateMutators;
}

export interface ValidWordProps {
    dictionary: string[];
    onSortDictionary: Function;
}
