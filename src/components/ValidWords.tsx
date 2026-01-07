import React, { useState } from 'react';
import Dictionary from '../utils/dict-logic';
import '../css/ValidWords.css';
import { KEY_ALPHA, KEY_BEST_GUESS } from '../utils/constants';

function ValidWords(props: {
    dictionary: Dictionary;
    onSortDictionary: Function;
}) {
    const [sortBy, setSortBy] = useState(KEY_ALPHA);

    return (
        <div>
            <div className='Possible-words-section'>
                <span>Possible words</span>
                {props.dictionary.length > 0 && (
                    <label className='Sort-label'>
                        Sort:
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                props.onSortDictionary(e.target.value);
                            }}
                        >
                            <option value={KEY_ALPHA}>Alphabetically</option>
                            <option value={KEY_BEST_GUESS}>Best guess</option>
                        </select>
                    </label>
                )}
            </div>

            <div className='Word-display-area'>
                {props.dictionary.length > 0 &&
                    props.dictionary.dict.map((word) => (
                        <span className='Word-item' key={word}>
                            {word}
                        </span>
                    ))}
            </div>

            <div>
                {props.dictionary.length === 0 && (
                    <span> No valid words left </span>
                )}
            </div>
        </div>
    );
}

export default ValidWords;
