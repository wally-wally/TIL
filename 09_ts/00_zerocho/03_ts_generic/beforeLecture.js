var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Card = /** @class */ (function () {
    function Card(hero, mine) {
        if (hero) {
            return new Hero(mine);
        }
        else {
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.floor((this.att + this.hp) / 2);
        }
        if (mine) {
            this.mine = true;
        }
    }
    return Card;
}());
// [정리!] public, protected, private
// public : 내 class, instance, 상속받는 자식 모두 사용 가능
// protected : 내 class와 나를 상속받는 자식한테 사용 가능(식구들한테만 공개)
// private : class 내에서만 접근 가능
new Card(true, false);
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(mine) {
        var _this = _super.call(this, true, mine) || this;
        _this.att = Math.ceil(Math.random() * 2);
        _this.hp = Math.ceil(Math.random() * 5) + 25;
        _this.hero = true;
        _this.field = true;
        return _this;
    }
    return Hero;
}(Card));
var card = new Card(true, true);
// card.cost // 접근 불가능
var card2 = new Card(true, true);
var card3 = new Card(true, true);
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
