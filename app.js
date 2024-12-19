document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const squares =  []

    let totalPelletsScore = 0;

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            square.id = i;
            grid.appendChild(square);
            squares.push(square);

            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot');
                totalPelletsScore += 1; // Pac-dots are worth 1 point
            }
            if (layout[i] === 1) {
                squares[i].classList.add('wall');
            }
            if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair');
            }
            if (layout[i] === 3) {
                squares[i].classList.add('power-pellet');
                totalPelletsScore += 10; // Power pellets are worth 10 points
            }
        }
    }

    createBoard()


    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')



    // movement
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        switch (e.key) {
            case 'ArrowLeft':
                if (
                    pacmanCurrentIndex % width !==0 && 
                    !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
                    !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex -= 1
                }
                if (squares[pacmanCurrentIndex -1] === squares[363]){
                    pacmanCurrentIndex = 391
                }
                break

            case 'ArrowRight':
                if (
                    pacmanCurrentIndex % width < width -1 && 
                    !squares[pacmanCurrentIndex +1].classList.contains('wall') && 
                    !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex += 1
                }
                if (squares[pacmanCurrentIndex +1] === squares[392]){
                    pacmanCurrentIndex = 364
                }
                break

            case  'ArrowUp':
                if (
                    pacmanCurrentIndex - width >= 0 && 
                    !squares[pacmanCurrentIndex-width].classList.contains('wall') && 
                    !squares[pacmanCurrentIndex-width].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex -= width
                }
                break

            case  'ArrowDown':
                if (pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex+width].classList.contains('wall') && 
                    !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex += width
                }
                break
        }
        squares[pacmanCurrentIndex].classList.add('pac-man')
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }
    document.addEventListener('keyup', movePacman)

    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score ++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }


    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            score += 10
            scoreDisplay.innerHTML = score
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)

            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }




    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    const ghosts = [
        { className: 'ghost1', startIndex: 348, speed: 200, isScared: false, currentIndex: 348 },
        { className: 'ghost2', startIndex: 376, speed: 250, isScared: false, currentIndex: 376 },
        { className: 'ghost3', startIndex: 351, speed: 300, isScared: false, currentIndex: 351 },
        { className: 'ghost4', startIndex: 379, speed: 350, isScared: false, currentIndex: 379 },
    ]    

    ghosts.forEach(ghost => {
        squares[ghost.startIndex].classList.add(ghost.className, 'ghost')
    })
    

    function eatGhost(ghost) {
        ghost.isScared = false
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score += 100
        scoreDisplay.innerHTML = score
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }    


    ghosts.forEach(ghost => moveGhost(ghost)) 

    function moveGhost(ghost) {
        console.log(ghost)
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function() {
            if (!squares[ghost.currentIndex + direction].classList.contains('ghost', 'scared-ghost') && !squares[ghost.currentIndex + direction].classList.contains('wall')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
            else direction = directions[Math.floor(Math.random() * directions.length)]

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost'); } 
            else {
                squares[ghost.currentIndex].classList.remove('scared-ghost');
            }
              

            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                eatGhost(ghost)
            }
            
            checkForGameOver()

        }, ghost.speed)
    } 

    function checkForGameOver() {
        if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function() { alert('Game Over'); }, 500);
        }
    }
    
    function checkForWin() {
        if (score >= totalPelletsScore) { // Win condition based on total pellets score
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function () {
                alert('You Win');
            }, 500);
        }
    }    
    
})

