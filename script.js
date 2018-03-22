$(document).ready(function() {
	let link = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';


	let deckID = $('.js-deck-id'),
	deckRemaining = $('.js-deck-remaining'),
	deckShuffled = $('.js-deck-shuffled'),
	btnAdd=$('.get-card');

	let deck = {
		id: null,
		remaining: null,
		shuffled: null
	};


	$.getJSON(link, function(result) {
		console.log(result)
		deck.id = result.deck_id;
		deck.remaining = result.remaining;
		deck.shuffled = result.shuffled;

		deckID.text(result.deck_id)
		deckRemaining.text(result.remaining)
		deckShuffled.text(result.shuffled)
	});	

	btnAdd.click(function() {
		$.getJSON(`https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=$($('.get-card-input').val())`, 
		function(result) {
			
			deck.remaining = result.remaining;
			deckRemaining.text(result.remaining);
			console.log(result);

			let cardsArray = result.cards;

			for (let i = 0; i<cardsArray.length;i++){
				$('.deck-cards').append(
					`<div class="card">
				<div class="card-img">
					<img src="${cardsArray[i].image}" alt="${cardsArray[i].cc}">
				</div>
				<p class="card-value">${cardsArray[i].code}</p>
			</div>`
					);
		

			}
			if ($('.deck-cards').height() > $(window).height()){
				$('html, body').animate({
					scrollTop: $(document).height()
				}, 800);
			}

		});

	});

});