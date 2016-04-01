// Original code by Basarat (https://github.com/basarat)
// Code originally from https://github.com/basarat/typescript-collections
/* tslint:disable */
module collections {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function(obj: any, prop: any) {
        return _hasOwnProperty.call(obj, prop);
    }
    
    /**
    * Function signature for checking equality
    */
    export interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }
    
    /**
     * Default function to test equality.
     * @function
     */
    export function defaultEquals<T>(a: T, b: T): boolean {
        return a === b;
    }

    /**
     * Default function to convert an object to a string.
     * @function
     */
    export function defaultToString(item: any): string {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (collections.isString(item)) {
            return '$s' + item;
        } else {
            return '$o' + item.toString();
        }
    }
    
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    export function isUndefined(obj: any): boolean {
        return (typeof obj) === 'undefined';
    }

    /**
     * Checks if the given argument is a string.
     * @function
     */
    export function isString(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object String]';
    }

    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    export module arrays {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        export function indexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        export function contains<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }

        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        export function remove<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }

        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        export function equals<T>(array1: T[], array2: T[], equalsFunction?: collections.IEqualsFunction<T>): boolean {
            var equals = equalsFunction || collections.defaultEquals;

            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        export function copy<T>(array: T[]): T[] {
            return array.concat();
        }

        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        export function swap<T>(array: T[], i: number, j: number): boolean {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }

        export function toString<T>(array: T[]): string {
            return '[' + array.toString() + ']';
        }

        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        export function forEach<T>(array: T[], callback: (item: T) => boolean): void {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
    }
    
    // Used internally by dictionary
    export interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }

    export class Dictionary<K, V>{

        /**
         * Object holding the key-value pairs.
         * @type {Object}
         * @private
         */
        protected table: { [key: string]: IDictionaryPair<K, V> };
        //: [key: K] will not work since indices can only by strings in javascript and typescript enforces this.

        /**
         * Number of elements in the list.
         * @type {number}
         * @private
         */
        protected nElements: number;

        /**
         * Function used to convert keys to strings.
         * @type {function(Object):string}
         * @protected
         */
        protected toStr: (key: K) => string;


        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction?: (key: K) => string) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }


        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key: K): V {
            var pair: IDictionaryPair<K, V> = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        }


        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key: K, value: V): V {

            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }

            var ret: V;
            var k = '$' + this.toStr(key);
            var previousElement: IDictionaryPair<K, V> = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        }

        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key: K): V {
            var k = '$' + this.toStr(key);
            var previousElement: IDictionaryPair<K, V> = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        }

        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys(): K[] {
            var array: K[] = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        }

        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values(): V[] {
            var array: V[] = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        }

        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        forEach(callback: (key: K, value: V) => any): void {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        }

        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        containsKey(key: K): boolean {
            return !collections.isUndefined(this.getValue(key));
        }

        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        clear() {
            this.table = {};
            this.nElements = 0;
        }

        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size(): number {
            return this.nElements;
        }

        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty(): boolean {
            return this.nElements <= 0;
        }

        toString(): string {
            var toret = "{";
            this.forEach((k, v) => {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        }
    } // End of dictionary
}// End of module
