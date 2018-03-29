/* global it, describe */
import {Card, Value, Suit} from '../src/card'
import {Deck} from '../src/deck'
import { expect } from 'chai';
import 'mocha'
describe('UT02: Deck', function () {
  describe('UT02-01: Constructor', function () {
    it('UT02-01-01: Return Deck', function () {
      let myDeck = new Deck()
      expect(myDeck.Cards.length).to.equal(52)
    })
  })
  describe('UT02-02: Shuffle', function () {
    it('UT02-02-01: Deck should be shuffled', function () {
      let myDeck = new Deck()
      expect(myDeck.Cards.length).to.equal(52)
      myDeck.shuffle()
      expect(myDeck.Cards.length).to.equal(52)
      let myCard = myDeck.peek()
      expect(myCard.value).to.not.equal(Value.King)
    })
  })
  describe('UT02-03: cardsInDeck', function () {
    it('UT02-03-01: Initialliy there should be 52', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
    })
    it('UT02-03-02: Adding a Card to get 53', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
      myDeck.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myDeck.cardsInDeck()).to.equal(53)
    })
    it('UT02-03-03: Drawing a Card to get 51', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
      myDeck.draw()
      expect(myDeck.cardsInDeck()).to.equal(51)
    })
  })
  describe('UT02-04: Draw', function () {
    it('UT02-04-01: Return Card on a fresh deck (it should be the King of Spades). Also the Deck should loose the card', function () {
      let myDeck = new Deck()
      expect(myDeck.Cards.length).to.equal(52)
      let myCard = myDeck.draw()
      expect(myCard.suit).to.equal((<any>Suit)[Suit.Spades])
      expect(myCard.value).to.equal((<any>Value)[Value.King])
      expect(myDeck.Cards.length).to.equal(51)
    })
  })
  describe('UT02-05: Peek', function () {
    it('UT02-05-01: Return Card on a fresh deck (it should be the King of Spades). Also the Deck should not loose the card', function () {
      let myDeck = new Deck()
      expect(myDeck.Cards.length).to.equal(52)
      let myCard = myDeck.peek()
      expect(myCard.suit).to.equal((<any>Suit)[Suit.Spades])
      expect(myCard.value).to.equal((<any>Value)[Value.King])
      expect(myDeck.Cards.length).to.equal(52)
    })
  })
  describe('UT02-06: add', function () {
    it('UT02-06-01: Card should be added Last and number of cards is up by one', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
      myDeck.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myDeck.cardsInDeck()).to.equal(53)
      let myCard = myDeck.peek()
      expect(myCard.suit).to.equal(Suit.Diamonds)
      expect(myCard.value).to.equal(Value.Eight)
    })
  })
  describe('UT02-07: Refill', function () {
    it('UT02-07-01: Performing on a new deck should increase the number to 104', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
      myDeck.refill()
      expect(myDeck.cardsInDeck()).to.equal(104)
    })
    it('UT02-07-02: Performing on an empty deck should set the number to 52 again', function () {
      let myDeck = new Deck()
      expect(myDeck.cardsInDeck()).to.equal(52)
      myDeck.Cards = new Array<Card>()
      expect(myDeck.cardsInDeck()).to.equal(0)
      myDeck.refill()
      expect(myDeck.cardsInDeck()).to.equal(52)
    })
  })
})