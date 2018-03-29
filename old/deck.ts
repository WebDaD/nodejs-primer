/**
 * @overview Deck Object containing an Array of Cards
 * @module deck
 * @author Dominik Sigmund
 * @version 1.0
 * @description Object Deck
 * @memberof lib-gs-cards
 */

import {Card, Value, Suit} from './card'
/** The Class Deck stands for a full Deck of Cards
 * @class Deck
 * */
export class Deck {
  /**
 * The Cards Array
 * @var {Card[]}
 */
  public Cards: Card[]
/** Creates a instance of class Deck
 * @throws {Error} Error
 * @returns {Deck} The Object
 * */
  constructor() {
    // CREATE DECK
    this.Cards = new Array<Card>()
    this.newDeck()
  }
  /** Shuffles the Deck
 * */
  public shuffle(): void {
    // remix this array
    for (let i = this.Cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.Cards[i], this.Cards[j]] = [this.Cards[j], this.Cards[i]];
    }
  }
  /** Returns the NUmber of Cards in the Deck
   * @returns {number} The Number
 * */
  public cardsInDeck(): number {
    return this.Cards.length
  }
  /** Draws a Card, reducing the number of cards in the deck
   * @returns {Card} The Card
 * */
  public draw(): Card {
    return this.Cards.pop()
  }
  /** Looks at a Card (ts!), not reducing the number of cards in the deck
   * @returns {Card} The Card
 * */
  public peek(): Card {
    return this.Cards[this.Cards.length - 1]
  }
  /** Adds a Card to the Deck
 * @param {Card} card - A Card Object
 * */
  public add(card: Card): void {
    this.Cards.push(card)
  }
  /** Adds 52 Cards to the Deck
 * */
  public refill(): void {
    this.newDeck()
  }
  /** Create the 52 Cards
 * */
  private newDeck(): void {
    for (let index = 0; index < 4; index++) {
      let suit: Suit = (<any>Suit)[index]
      for (let index2 = 1; index2 < 14; index2++) {
        let value: Value = (<any>Value)[index2]
        this.Cards.push(new Card(value, suit)) 
      } 
    }
  }
}