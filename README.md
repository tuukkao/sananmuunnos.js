#sananmuunnos.js
Sananmuunnos solving for Javascript.
##What is this?
Quoting [Wikipedia][1]:

> Sananmuunnos ("Word transformation"), sometimes kääntösana, is a sort of verbal play in the Finnish language, similar to spoonerisms in English.

> Special to Finnish is a narrow phoneme inventory and vowel harmony. As Finnish is a mora-divided language, it is morae that are exchanged, not syllables (often a mora is also a syllable in a Finnish word, but not always). Also, Finnish inflectional and derivational morphology is extensive, thus applying a suffix from another word often produces a valid word. This leads to large number of possible spoonerisms. Much of practical sananmuunnos wordplay revolves around obscene double entendre expressed by spoonerism.

This library is an experiment in solving sananmuunnoses systematically. It is a Javascript port of my [sananmuunnos Python module][2].
##How to use?
###In node.js

    $npm install sananmuunnos

Then:

    var sm = require("sananmuunnos");
    console.log(sm("sanan muunnos"));
###In the browser
Use the version in dist/sananmuunnos.js.

    <script src="dist/sananmuunnos.js"></script>
    <script>
      alert(sananmuunnos("sanan muunnos"));
    </script>
##Author
Tuukka Ojala <tuukka.ojala@gmail.com>
##License
This work is licensed under [the MIT license](LICENSE).
[1]:https://en.wikipedia.org/wiki/Sananmuunnos
[2]:https://github.com/tuukkao/sananmuunnos