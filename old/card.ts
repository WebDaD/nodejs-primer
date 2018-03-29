/**
 * @overview Card Object containing a Suit and a Value
 * @module card
 * @author Dominik Sigmund
 * @version 1.0
 * @description Object Class and Enums Suit and Value
 * @memberof lib-gs-cards
 */

/** The Class Card stands for a single Card
 * @class Card
 * */
export class Card {
  /**
   * The Value as property
   * @var {Value}
   */
    public value: Value
  /**
   * The Suit as property
   * @var {Suit}
   */
    public suit: Suit
  
  /** Creates a instance of class Card
   * @throws {Error} Error
   * @param {Value} value - Some Value
   * @param {Suit} suit - Some Suit
   * @returns {Card} The Object
   * */
    constructor(value: Value, suit: Suit) {
      if(typeof suit === 'undefined' || suit === null) {
        throw new Error('Please Provide Argument suit')
      }
      if(typeof value === 'undefined' || value === null) {
        throw new Error('Please Provide Argument value')
      }
      this.value = value
      this.suit = suit
    }
  /** Returns the Value of the Card as Number
   * @throws {Error} Error
   * @returns {number} The VAlue (Ace == 1, JQK == 10)
   * */
    public valueOf(): number {
      switch (this.value) {
        case Value.Ace: console.log('here');return 1
        case Value.Two: return 2
        case Value.Three: return 3
        case Value.Four: return 4
        case Value.Five: return 5
        case Value.Six:	return 6
        case Value.Seven:	return 7
        case Value.Eight:	return 8
        case Value.Nine: return 9
        case Value.Ten:
        case Value.Jack:
        case Value.Queen:     
        case Value.King: return 10   
        default: throw "Error: No Valid Card for Value: " + this.value
      }
    }
  }
  
  export default Card
  
  export enum Suit {
    Hearts = 0,
    Diamonds = 1,
    Clubs = 2,
    Spades = 3,
  }
  export enum Value {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six =	6,
    Seven =	7,
    Eight =	8,
    Nine = 9,
    Ten =	10,
    Jack = 11,
    Queen = 12,
    King = 13
  }