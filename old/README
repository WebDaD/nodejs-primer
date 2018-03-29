# lib-gs-cards

A Part of the gamingsimulator. Module Representing Cards and a Deck of Cards.

## Installation

... is as simple as `npm install lib-gs-cards`

## Usage

First, require the Modules:

`const deck = require('lib-gs-cards/dist/deck')`

`const card = require('lib-gs-cards/dist/card')`

`const hand = require('lib-gs-cards/dist/hand')`

or ES6 Style:

`import Deck from 'lib-gs-cards/dist/src/deck'`
`import Card, Value, Suit from 'lib-gs-cards/dist/src/card'`
`import Hand from 'lib-gs-cards/dist/src/hand'`

### The Card

You May Create a Card:

`let myCard= new Card(Value.Ace, Suit.Spades)`

or draw one form the Deck or get one form the hand...

Then you may:

#### Get The Value of the Card as Number

`var value: number = myCard.valueOf()`

Easy as that. Ace counts 1, 10/J/Q/K counts 10

### The Deck

After That, create a new Deck:

`let myDeck = new Deck()`

Then you may perform the following actions:

#### Shuffle Deck

`myDeck.shuffle()`

Now the Cards are in a random Order

#### Get Number of Cards in Deck

`myDeck.cardsInDeck()`

How many Cards are left in my deck?

#### Draw A Card

`let Card = myDeck.draw()`

Returns a Card Object and reduces the Deck by this Card

#### Peek

`let Card = myDeck.peek()`

Returns a Card Object and does not alter the deck

#### Add a Card

`myDeck.add(new Card(Value.Ace, Suit.Spades))`

Allows to Add Any Card to the Deck

#### Refill the Deck

`myDeck.refill()`

Adds all 52 Cards to the Deck. Even if not empty yet.

### The Hand

The Hand is the Players Stack. Create One:

`let myHand = new Hand()`

Then you may:

#### List all Cards

Returns an Array of Cards:

`let cards: Card[] = myHand.list()`

#### Get Number of Cards in Hand

`myHand.cardsInHand()`

How many Cards are left in my hand?

#### Look at a Card

Returns the Card, not altering the Hand:

`let card: Card = myHand.look(index)`

#### Play a Card

Returns the Card, removing it from the Hand:

`let card: Card = myHand.play(index)`

#### Add a Card to the Hand

`myHand.add(new Card(Value.Ace, Suit.Spades))`

Allows to Add Any Card to the Hand

## Dependencies

None. Yet.

## Documentation for Developers

Here be Some Infos to make this even better.

### Libs

ClassDiagram:

![The diagram](https://github.com/WebDaD/lib-gs-cards/raw/master/docs/classDiagram.png "The class Diagram")

Can be found in docs/classDiagram.png

Also as editable plantUML-File.

JSDOC. See also HTML Version @ docs/jsdoc/index.html

### Tests

The Tests are written using the assert-class and can be found in the tests-folder

You may use your favorite Test-Runner to do them yourself.

My Commandline is as follows:

`istanbul cover _mocha -- dist/tests/test.card.js dist/tests/test.deck.js dist/tests/test.hand.js -R mochawesome`

OR

`npm run test`

#### Results

Coverage: docs/coverage/lcov-report/index.html
Mochawesome-Report: docs/mochawesome-report/index.html

### JSON

docs/card.schema.json

docs/deck.schema.json

docs/hand.schema.json

## Authors

* Dominik Sigmund <dominik.sigmund@webdad.eu>

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>