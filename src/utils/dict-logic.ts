import { wordleDictionary } from './dict-words';
import { KEY_ALPHA, KEY_BEST_GUESS } from './constants';

class Dictionary {
    // choosing to maintain two copies of the dictionaries to avoid having to repeatedly sort
    private dictionaries: Map<string, string[]>;
    private grayLetters: Set<string>;
    private greenLetters: Map<string, number>;
    private yellowLetters: Map<string, number>;
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
        this.greenLetters = new Map();
        this.yellowLetters = new Map();
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
        if (char === '') return;
        this.grayLetters.add(char);
    };

    addGreenLetter = (char: string, position: number) => {
        if (char === '') return;
        this.greenLetters.set(char, position);
    };

    addYellowLetter = (char: string, position: number) => {
        if (char === '') return;
        this.yellowLetters.set(char, position);
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

            this.greenLetters.forEach((pos, letter) => {
                this.dictionaries.set(
                    key,
                    this.dictionaries.get(key)!.filter((word) => {
                        // not using indexOf to avoid complications with words that have multiple occurrences of a letter
                        return word.charAt(pos) === letter;
                    })
                );
            });

            this.yellowLetters.forEach((pos, letter) => {
                this.dictionaries.set(
                    key,
                    this.dictionaries.get(key)!.filter((word) => {
                        // not using indexOf to avoid complications with words that have multiple occurrences of a letter
                        return (
                            word.includes(letter) && word.charAt(pos) !== letter
                        );
                    })
                );
            });
        });
    };

    private numUniqueCharsInWord = (word: string) => {
        return new Set(word.split('')).size;
    };
}

export default Dictionary;
