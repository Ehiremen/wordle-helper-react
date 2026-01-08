import { wordleDictionary } from './dict-words';
import {
    EMPTY_STRING,
    EMPTY_STRING_TUPLE_LEN_5,
    KEY_ALPHA,
    KEY_BEST_GUESS,
} from './constants';

class Dictionary {
    // choosing to maintain two copies of the dictionaries to avoid having to repeatedly sort
    private dictionaries: Map<string, string[]>;
    private grayLetters: Set<string>;
    private greenLetters: [string, string, string, string, string]; // max 5 letters in an attempt
    private yellowLetters: [string, string, string, string, string];
    private countsInYellowAndGreen: Map<string, number>;
    private currentSort: string;

    public constructor() {
        this.dictionaries = new Map();
        this.dictionaries.set(
            KEY_ALPHA,
            wordleDictionary.map((word) => word.trim().toUpperCase()).sort()
        );
        this.dictionaries.set(
            KEY_BEST_GUESS,
            wordleDictionary
                .map((word) => word.trim().toUpperCase())
                .sort(
                    (a, b) =>
                        this.numUniqueCharsInWord(b) -
                        this.numUniqueCharsInWord(a)
                )
        );

        this.currentSort = KEY_ALPHA;

        this.grayLetters = new Set();
        this.greenLetters = [...EMPTY_STRING_TUPLE_LEN_5];
        this.yellowLetters = [...EMPTY_STRING_TUPLE_LEN_5];
        this.countsInYellowAndGreen = new Map();
    }

    get dict() {
        return this.dictionaries.get(this.currentSort)!!;
    }

    get length() {
        return this.dictionaries.get(this.currentSort)!!.length;
    }

    sortAlphabetically = () => {
        this.currentSort = KEY_ALPHA;
    };

    sortByBestGuesses = () => {
        // we want to see greater number of unique chars first
        this.currentSort = KEY_BEST_GUESS;
    };

    addGrayLetter = (char: string) => {
        if (char === EMPTY_STRING) return;
        this.grayLetters.add(char);
    };

    addGreenLetter = (char: string, position: number) => {
        if (char === EMPTY_STRING) return;
        this.greenLetters[position] = char;
        this.countsInYellowAndGreen.set(
            char,
            1 + (this.countsInYellowAndGreen.get(char) || 0)
        );
    };

    addYellowLetter = (char: string, position: number) => {
        if (char === EMPTY_STRING) return;
        this.yellowLetters[position] = char;
        this.countsInYellowAndGreen.set(
            char,
            1 + (this.countsInYellowAndGreen.get(char) || 0)
        );
    };

    updateDictionary = () => {
        this.dictionaries.forEach((_, key) => {
            this.grayLetters.forEach((letter) => {
                this.dictionaries.set(
                    key,
                    this.dictionaries.get(key)!.filter((word) => {
                        return !word.includes(letter);
                    })
                );
            });

            this.greenLetters.forEach((letter, pos) => {
                if (letter !== EMPTY_STRING) {
                    this.dictionaries.set(
                        key,
                        this.dictionaries.get(key)!.filter((word) => {
                            // not using indexOf to avoid complications with words that have multiple occurrences of a letter
                            return word.charAt(pos) === letter;
                        })
                    );
                }
            });

            this.yellowLetters.forEach((letter, pos) => {
                if (letter !== EMPTY_STRING) {
                    this.dictionaries.set(
                        key,
                        this.dictionaries.get(key)!.filter((word) => {
                            // not using indexOf to avoid complications with words that have multiple occurrences of a letter
                            return (
                                word.includes(letter) &&
                                word.charAt(pos) !== letter
                            );
                        })
                    );
                }
            });

            this.countsInYellowAndGreen.forEach((minCount, char) => {
                this.dictionaries.set(
                    key,
                    this.dictionaries.get(key)!.filter((word) => {
                        let regex = new RegExp(char, 'g');
                        let count = (word.match(regex) || []).length;
                        return count >= minCount;
                    })
                );
            });
        });

        // because the dictionary's updated, we don't need to retain these letters.
        this.grayLetters.clear();
        this.greenLetters = [...EMPTY_STRING_TUPLE_LEN_5];
        this.yellowLetters = [...EMPTY_STRING_TUPLE_LEN_5];
        this.countsInYellowAndGreen.clear();
    };

    private numUniqueCharsInWord = (word: string) => {
        return new Set(word.split('')).size;
    };
}

export default Dictionary;
