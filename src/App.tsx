import React, { useState } from 'react';
import './css/App.css';
import WordleRow from './components/WordleRow';
import ValidWords from './components/ValidWords';
import Dictionary from './utils/dict-logic';
import { KEY_BEST_GUESS } from './utils/constants';
import { DictionaryStateMutators } from './interface';

function App() {
    const [dict, setDict] = useState(new Dictionary());
    const [rows, setRows] = useState([1]);
    const [showAddRowBtn, setShowAddRowBtn] = useState(true);

    const onSortDictionary = (sortBy: string) => {
        if (sortBy === KEY_BEST_GUESS) {
            dict.sortByBestGuesses();
        } else {
            dict.sortAlphabetically();
        }
    };

    const onSetLetterGray = (letter: string) => {
        dict.addGrayLetter(letter);
    };

    const onSetLetterGreen = (letter: string, pos: number) => {
        dict.addGreenLetter(letter, pos);
    };

    const onSetLetterYellow = (letter: string, pos: number) => {
        dict.addYellowLetter(letter, pos);
    };

    const onUpdateDictionary = () => {
        dict.updateDictionary();
    };

    const dictionaryMutators: DictionaryStateMutators = {
        onSetLetterGray,
        onSetLetterGreen,
        onSetLetterYellow,
        onUpdateDictionary,
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <p>
                    Wordle Helper (not solver!) by lexy_bot. &nbsp;
                    <a
                        className='Wordle-link'
                        href='https://www.nytimes.com/games/wordle/index.html'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Play today's wordle!
                    </a>
                </p>
            </header>

            {rows.map((rowNum) => (
                <WordleRow
                    key={rowNum}
                    dictionaryStateMutators={dictionaryMutators}
                />
            ))}

            {showAddRowBtn && (
                <button
                    onClick={() => {
                        const nextId = rows.length + 1;
                        setRows([...rows, nextId]);
                        if (nextId === 6) {
                            setShowAddRowBtn(false);
                        }
                    }}
                >
                    add row
                </button>
            )}

            <ValidWords dictionary={dict} onSortDictionary={onSortDictionary} />
        </div>
    );
}

export default App;
