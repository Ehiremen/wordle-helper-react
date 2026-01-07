import React, { useState } from 'react';
import './css/App.css';
import WordleRow from './components/WordleRow';
import ValidWords from './components/ValidWords';
import Dictionary from './utils/dict-logic';
import { KEY_BEST_GUESS } from './utils/constants';
import { DictionaryStateMutators } from './interface';

function App() {
    const [dictionaryState, setDictionaryState] = useState(new Dictionary()); // doesn't work if we maintain s dictObject that's not a state
    const [dictionaryWordsList, setDictionaryWordsList] = useState(
        dictionaryState.dict
    ); // passing the list directly allows validWords component to reflect updates when wordleRow modifies the list
    const [rows, setRows] = useState([1]);
    const [showAddRowBtn, setShowAddRowBtn] = useState(true);

    const onSortDictionary = (sortBy: string) => {
        if (sortBy === KEY_BEST_GUESS) {
            dictionaryState.sortByBestGuesses();
        } else {
            dictionaryState.sortAlphabetically();
        }
        setDictionaryWordsList(dictionaryState.dict);
    };

    const onSetLetterGray = (letter: string) => {
        dictionaryState.addGrayLetter(letter);
    };

    const onSetLetterGreen = (letter: string, pos: number) => {
        dictionaryState.addGreenLetter(letter, pos);
    };

    const onSetLetterYellow = (letter: string, pos: number) => {
        dictionaryState.addYellowLetter(letter, pos);
    };

    const onUpdateDictionary = () => {
        dictionaryState.updateDictionary();
        setDictionaryWordsList(dictionaryState.dict);
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
                    Wordle Helper (not solver!) by Ehiremen. &nbsp;
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

            <ValidWords
                dictionary={dictionaryWordsList}
                onSortDictionary={onSortDictionary}
            />
        </div>
    );
}

export default App;
