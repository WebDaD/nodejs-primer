/* global it, describe */
import {Card, Value, Suit} from '../src/card'
import {Hand} from '../src/hand'
import { expect } from 'chai';
import 'mocha'
describe('UT03: Hand', function () {
  describe('UT03-01: Constructor', function () {
    it('UT03-01-01: Return Hand', function () {
      let myHand = new Hand()
      expect(myHand.Cards.length).to.equal(0)
    })
  })
  describe('UT03-02: List', function () {
    it('UT03-02-01: Should show an Array of all Cards', function () {
      let myHand = new Hand()
      expect(myHand.Cards.length).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      myHand.add(new Card(Value.Nine, Suit.Hearts))
      expect(myHand.cardsInHand()).to.equal(2)
      let cards = myHand.list()
      expect(cards[0].suit).to.equal(Suit.Diamonds)
      expect(cards[0].value).to.equal(Value.Eight)
      expect(cards[1].suit).to.equal(Suit.Hearts)
      expect(cards[1].value).to.equal(Value.Nine)
      expect(myHand.cardsInHand()).to.equal(2)
    })
  })
  describe('UT03-03: cardsInHand', function () {
    it('UT03-03-01: Initialliy there should be 0', function () {
      let myHand = new Hand()
      expect(myHand.cardsInHand()).to.equal(0)
    })
    it('UT03-03-02: Adding a Card to get 1', function () {
      let myHand = new Hand()
      expect(myHand.cardsInHand()).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myHand.cardsInHand()).to.equal(1)
    })
    it('UT02-03-03: Playing a Card to get to 0', function () {
      let myHand = new Hand()
      expect(myHand.cardsInHand()).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myHand.cardsInHand()).to.equal(1)
      myHand.play(0)
      expect(myHand.cardsInHand()).to.equal(0)
    })
  })
  describe('UT03-04: Play', function () {
    it('UT03-04-01: Play Card on Index', function () {
      let myHand = new Hand()
      expect(myHand.Cards.length).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myHand.cardsInHand()).to.equal(1)
      let myCard = myHand.play(0)
      expect(myCard.suit).to.equal(Suit.Diamonds)
      expect(myCard.value).to.equal(Value.Eight)
      expect(myHand.Cards.length).to.equal(0)
    })
  })
  describe('UT03-05: Look', function () {
    it('UT03-05-01: Look at Card on index', function () {
      let myHand = new Hand()
      expect(myHand.Cards.length).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myHand.cardsInHand()).to.equal(1)
      let myCard = myHand.look(0)
      expect(myCard.suit).to.equal(Suit.Diamonds)
      expect(myCard.value).to.equal(Value.Eight)
      expect(myHand.Cards.length).to.equal(1)
    })
  })
  describe('UT03-06: add', function () {
    it('UT03-06-01: Card should be added Last and number of cards is up by one', function () {
      let myHand = new Hand()
      expect(myHand.cardsInHand()).to.equal(0)
      myHand.add(new Card(Value.Eight, Suit.Diamonds))
      expect(myHand.cardsInHand()).to.equal(1)
      let myCard = myHand.look(0)
      expect(myCard.suit).to.equal(Suit.Diamonds)
      expect(myCard.value).to.equal(Value.Eight)
    })
  })
})