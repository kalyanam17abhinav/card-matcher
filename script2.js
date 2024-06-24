const images = [
    '/image1.png', // Update these paths
    '/image2.png',
    '/image3.png'
];

let gridItems = Array.from(document.querySelectorAll('.grid-item'));
let selectedImages = [];
let clickCount = 0;

function revealImage(item) {
    if (item.classList.contains('revealed')) return;

    const index = item.getAttribute('data-index');
    const imageIndex = Math.floor(index / 3);
    item.innerHTML = `<img src="${images[imageIndex]}" alt="image">`;
    item.classList.add('revealed');

    selectedImages.push(imageIndex);
    clickCount++;

    
    checkWin();
    
}

function checkWin() {
    const lastTwo = selectedImages.slice(-2);
    
    // Check if two consecutive images are different
    if (lastTwo.length === 2 && lastTwo[0] !== lastTwo[1]) {
        document.getElementById('message').textContent = 'You lost. Try again!';
        setTimeout(()=>{
            
        revealAllImages();
        },400);
        disableGrid();
    } 
    
    // Check if the last three are the same (for a win condition)
    const lastThree = selectedImages.slice(-3);
    if (lastThree.length === 3 && lastThree[0] === lastThree[1] && lastThree[1] === lastThree[2]) {
        document.getElementById('message').textContent = 'Congratulations! You won!';
        disableGrid();
    }
}

function revealAllImages() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.add('revealed');
        const index = item.getAttribute('data-index');
    const imageIndex = Math.floor(index / 3);
    item.innerHTML = `<img src="${images[imageIndex]}" alt="image">`;
    item.classList.add('revealed');
    });

}

function disableGrid() {
    gridItems.forEach(item => {
        item.classList.add('disabled');
        item.onclick = null;
    });
}

function reshuffle() {
    selectedImages = [];
    clickCount = 0;
    document.getElementById('message').textContent = 'Select three consecutive same images to win!';
    gridItems.forEach(item => {
        item.classList.remove('revealed', 'disabled');
        item.innerHTML = '';
        item.onclick = () => revealImage(item);
    });
    shuffleGrid();
}

function shuffleGrid() {
    for (let i = gridItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gridItems[i].style.order = j;
        gridItems[j].style.order = i;
    }
}

window.onload = reshuffle;