window.onload = function() {
    switchLayout('play');
};

let points = 0;
let cards = 0;
let tapPower = 1;
let autoTapEnabled = false;
let autoTapMultiplier = 1;
const cardPrices = [10, 20, 30]; // Preços das cartas
const cardImages = ["caramelo.png", "caramelo.png", "caramelo.png"]; // Imagens das cartas

function switchLayout(layout) {
    const cardsLayout = document.getElementById("card-cards");
    const buyLayout = document.getElementById("card-buy");
    const playLayout = document.getElementById("card-play");

    if (layout === 'cards') {
        cardsLayout.style.display = 'flex';
        playLayout.style.display = 'none';
        buyLayout.style.display = 'none';
    } else if (layout === 'play') {
        cardsLayout.style.display = 'none';
        playLayout.style.display = 'flex';
        buyLayout.style.display = 'none';
    } else if (layout === 'buy') {
        cardsLayout.style.display = 'none';
        playLayout.style.display = 'none';
        buyLayout.style.display = 'flex';
    }
}

function addPoints() {
    const pointsLabel = document.getElementById('points');
    points += tapPower;
    pointsLabel.innerHTML = points;
}

function activateCardPower(cardIndex) {
    if (cardIndex === 0) {
        tapPower = 2; // Carta 1: Multiplica o valor do TAP por 2
    } else if (cardIndex === 1) {
        if (!autoTapEnabled) {
            autoTapEnabled = true;
            startAutoTap(); // Carta 2: Ativa o TAP automático
        }
    } else if (cardIndex === 2) {
        autoTapMultiplier = 2; // Carta 3: Multiplica os pontos ganhos com TAP automático
    }
}

function startAutoTap() {
    setInterval(() => {
        points += autoTapMultiplier; // TAP automático
        document.getElementById('points').innerHTML = points;
    }, 1000); // A cada 1 segundo
}

function buyCard(cardIndex) {
    const cardPrice = cardPrices[cardIndex];
    if (points >= cardPrice) {
        points -= cardPrice; // Deduz os pontos
        cards++; // Aumenta a contagem de cartas
        document.getElementById('points').innerHTML = points; // Atualiza os pontos
        document.getElementById('cards').innerHTML = cards; // Atualiza a contagem de cartas

        // Adiciona a carta à coleção de cartas
        const ownedCards = document.getElementById('owned-cards');
        const newCardDiv = document.createElement('div');
        newCardDiv.classList.add('img-div');
        newCardDiv.innerHTML = `
            <img class="img-card" src="${cardImages[cardIndex]}" alt="">
            <p>Carta ${cardIndex + 1}</p>
        `;
        ownedCards.appendChild(newCardDiv);

        // Ativa o poder da carta comprada
        activateCardPower(cardIndex);

        // Remove a carta da seção de compras
        const cardToRemove = document.getElementById(`card-${cardIndex}`);
        cardToRemove.remove();

        alert('Você comprou uma carta e ativou o poder dela!');
    } else {
        alert('Pontos insuficientes para comprar esta carta.');
    }
}
