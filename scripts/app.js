/* global $:false, TarotDeck:fasle */

const DECK_IMAGES = 'images/smith-waite/';

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=/]/g, function (s) {
    return entityMap[s];
  });
}

function deal(name, cards) {
  const layout = $('#' + name + '-layout');
  for (let i = 0; i < cards.length; i++) {
    layout.append('<div id="' + name + '-card-' +
      (i + 1) + '" class="card-container"><span class="card-index">' +
      (i + 1) + '</span><img class="card-img" data-image="' +
      cards[i].number + '" data-name="' +
      cards[i].name + '" data-meaning="' +
      escapeHtml(cards[i].meaning) + '" data-advise="' +
      escapeHtml(cards[i].advise) + '" src="' + DECK_IMAGES + 'back.jpg"></div>');

    if (cards[i].upsidedown) {
      const card = $('#' + name + '-card-' + (i + 1) + ' .card-img');
      if (card.css('transform') !== 'none') {
        card.addClass('upsidedown-tapped-card');
      } else {
        card.addClass('upsidedown-card');
      }
    }
  }
}

function buildToolTip(title, meaning, advise) {
  return '<b>' + title + '</b><br>' +
    escapeHtml(meaning).replace('\n', '<br>') + '<br><br><b>Advise</b><br>' +
    escapeHtml(advise).replace('\n', '<br>');
}

$(document).ready(function () {

  const deck = new TarotDeck();
  for (let i = 0; i < 7; i ++) {
    deck.shuffle();
  }

  deal('the-celtic-cross', deck.draw(10));
  deal('the-cross', deck.draw(4));
  deal('the-relationship', deck.draw(8));
  deal('the-tree-of-life', deck.draw(10));
  deal('the-blockade', deck.draw(5));
  deal('the-decision', deck.draw(7));
  deal('the-astrological-circle', deck.draw(12));

  $('.card-img').on('click', function () {
    const card = $(this);
    card.off('click');

    this.src = DECK_IMAGES + card.data('image') + '.jpg';

    const tooltip = $('<p class="xtooltip">' +
        buildToolTip(card.data('name'), card.data('meaning'), card.data('advise')) + '</p>');
    tooltip.appendTo('body').show();

    card.hover(function () {
      tooltip.appendTo('body').show();

    // hover out
    }, function () {
      $('.xtooltip').remove();

    // follow mouse
    }).mousemove(function (e) {
      $('.xtooltip').css({ top: e.pageY + 20, left: e.pageX + 10 });
    });
  });

});
