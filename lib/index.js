/*
sananmuunnos.js
(c) 2016 Tuukka Ojala <tuukka.ojala@gmail.com>
This file is distributed under the MIT license.
*/

// Helpers
/**
 * Checks if the string in question is  in the specified array. Returns true if a match is found.
 */
String.prototype.oneOf = function(obj) {
    for (var i =0; i < obj.length; i ++) {
        if (obj[i] == this) return true;
    }
    return false;
};

/**
 * Concatenates all the parameters into a single word. Each parameter is separated by one space (" ").
 */
function make_word() {
    var word = '';
    for (var i =0; i < arguments.length -1; i ++) {
        if (arguments[i]) {
            word += arguments[i] + " ";
        }
    }
    word += arguments[arguments.length -1];
    return word;
}

// Regular expressions for detecting different types of sananmuunnoses
// Double vowel: the word begins with a consonant and continues with
// two identical vowels.
var double_vowel = /^[^aeiouyäö]?([aeiouyäö])\1/,
    // initial vowel: the word begins with a vowel and continues with a letter which
    // is not the same as the previous one.
    initial_vowel = /^[aeiouyäö]/,
    // Initial consonant: The word begins with a consonant and continues with
    // two non-identical vowels.
    initial_consonant = /^[^aeiouyäö]([aeiouyäö])[^\1]/,
    // Matches any vowel.
    vowel = /[aeiouyäö]/;

// The following 3 functions test a pair of words against the regular expressions above. If they match, the words are transformed 
// accordingly. Otherwise the function returns false.

/**
 * Test word1 and word2 against the "double vowel" rule.
 */
function is_double_vowel(word1, word2) {
    var vowel1, vowel2, // the locations of the first vowels in the string
        initial1, initial2, // the beginnings of the words that will be attached later
        transformed1, transformed2; // the transformed words
    if (double_vowel.test(word2)) {
        vowel1 = vowel.exec(word1);
        vowel2 = vowel.exec(word2);
        initial1 = word1.slice(0, vowel1.index +1) +word1.charAt(vowel1.index);
        initial2 = word2.slice(0, vowel2.index +1);
        transformed1 = initial2 +word1.slice(vowel1.index +vowel1[0].length);
        transformed2 = initial1 +word2.slice(vowel2.index +vowel2[0].length +1);
        return([transformed1, transformed2]);
    } else {
        return(false);
    }
}

/**
 * Test word1 and word2 against the "initial vowel" rule.
 */
function is_initial_vowel(word1, word2) {
    var transformed1, transformed2;
    if (initial_vowel.test(word1)) {
        transformed1 = word2.slice(0, 2) +word1.slice(1);
        transformed2 = word1.charAt(0) +word2.slice(2);
        return([transformed1, transformed2]);
    } else {
        return(false);
    }
}

/**
 * Test word1 and word2 against the "initial consonant" rule.
 */
function is_initial_consonant(word1, word2) {
    var transformed1, transformed2;
    if (initial_consonant.test(word1)) {
        transformed1 = word2.slice(0, 2) +word1.slice(2);
        transformed2 = word1.slice(0, 2) +word2.slice(2);
        return([transformed1, transformed2]);
    } else {
        return(false);
    }
}

/**
 * Attempts to make the given word comply with Finnish vowel harmony.
 * 
 * If the first vowel of the word is a front vowel (a, o or u)
 * all the vowels get transformed to their equivalent back vowels (ä, ö, y) and vice versa.
 */
function vowel_harmony(word) {
    var first_vowel; // the occurrence of the first vowel in the given word.
    first_vowel = vowel.exec(word);
    if (first_vowel && word.charAt(first_vowel.index).oneOf(['a', 'o', 'u'])) {
        word = word.replace(/ä/g, "a");
        word = word.replace(/ö/g, "o");
        word = word.replace(/y/g, "u");
    } else if (first_vowel && word.charAt(first_vowel.index).oneOf(['ä', 'ö', 'y'])) {
        word = word.replace(/a/g, "ä");
        word = word.replace(/o/g, "ö");
        word = word.replace(/u/g, "y");
    }
    return word;
}

/**
 * Tries transforming word1 and word2 with the given transform function.
 * 
 * It tries swapping the words if the transformation fails.
 * This function returnsthe transformed words or false if
 * the transformation failed both ways.
 */
function test(transformation, word1, word2) {
    var result; // the transformed pair of words.
    result = transformation(word1, word2);
    if (!result) {
        result = transformation(word2, word1);
        if (result) {
            return([result[1], result[0]]);
        }
    }
    return(result);
}

// An array of all the transformation functions.
var transformations = [is_double_vowel, is_initial_vowel, is_initial_consonant];

/**
 * Make a sananmuunnos ("word transformation") out of the given words.
 * 
 * This function returns either the created sananmuunnos or null
 * if the transformation failed.
 */
module.exports = function(words) {
    var transformed, // stores the result of each transformation function until a working one is found.
        words_list, // the words of the given parameter split into an array.
        word1, word2; // the contents of transformed split into their own variables.
    words = words.toLowerCase();
    words_list = words.split(" ");
    if (words_list.length < 2) return null;
    word1 = words_list[0];
    word2 = words_list[words_list.length -1];
    for (var transformation in transformations) {
        transformed = test(transformations[transformation], word1, word2);
        if (transformed) {
            break;
        }
    }
    word1 = transformed[0];
    word2 = transformed[1];
    word1 = vowel_harmony(word1);
    word2 = vowel_harmony(word2);
    return make_word(word1, words_list.slice(1, words_list.length -1).join(" "), word2);
};