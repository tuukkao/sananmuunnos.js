!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.sananmuunnos=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
function make_word(){for(var e="",n=0;n<arguments.length-1;n++)arguments[n]&&(e+=arguments[n]+" ");return e+=arguments[arguments.length-1]}function is_double_vowel(e,n){var i,t,o,r,a,l;return double_vowel.test(n)?(i=vowel.exec(e),t=vowel.exec(n),o=e.slice(0,i.index+1)+e.charAt(i.index),r=n.slice(0,t.index+1),a=r+e.slice(i.index+i[0].length),l=o+n.slice(t.index+t[0].length+1),[a,l]):!1}function is_initial_vowel(e,n){var i,t;return initial_vowel.test(e)?(i=n.slice(0,2)+e.slice(1),t=e.charAt(0)+n.slice(2),[i,t]):!1}function is_initial_consonant(e,n){var i,t;return initial_consonant.test(e)?(i=n.slice(0,2)+e.slice(2),t=e.slice(0,2)+n.slice(2),[i,t]):!1}function vowel_harmony(e){var n;return n=vowel.exec(e),n&&e.charAt(n.index).oneOf(["a","o","u"])?(e=e.replace(/ä/g,"a"),e=e.replace(/ö/g,"o"),e=e.replace(/y/g,"u")):n&&e.charAt(n.index).oneOf(["ä","ö","y"])&&(e=e.replace(/a/g,"ä"),e=e.replace(/o/g,"ö"),e=e.replace(/u/g,"y")),e}function test(e,n,i){var t;return t=e(n,i),!t&&(t=e(i,n))?[t[1],t[0]]:t}String.prototype.oneOf=function(e){for(var n=0;n<e.length;n++)if(e[n]==this)return!0;return!1};var double_vowel=/^[^aeiouyäö]?([aeiouyäö])\1/,initial_vowel=/^[aeiouyäö]/,initial_consonant=/^[^aeiouyäö]([aeiouyäö])[^\1]/,vowel=/[aeiouyäö]/,transformations=[is_double_vowel,is_initial_vowel,is_initial_consonant];module.exports=function(e){var n,i,t,o;if(e=e.toLowerCase(),i=e.split(" "),i.length<2)return null;t=i[0],o=i[i.length-1];for(var r in transformations)if(n=test(transformations[r],t,o))break;return t=n[0],o=n[1],t=vowel_harmony(t),o=vowel_harmony(o),make_word(t,i.slice(1,i.length-1).join(" "),o)};
},{}]},{},[1])
(1)
});