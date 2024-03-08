export const generateRandomScramble = () => {
    const availableMoves = ["R", "L", "U", "D", "F", "B"];
    const turn = ["'", "2", ""];
    const scrambleLength = 20;
    let lastRandomIndex = -1;

    let scramble = "";

    for (let i = 0; i < scrambleLength; i++) {
        const randomTurnIndex = Math.floor(Math.random() * turn.length);
        let randomMovesIndex = Math.floor(
            Math.random() * availableMoves.length
        );

        while (randomMovesIndex === lastRandomIndex) {
            randomMovesIndex = Math.floor(
                Math.random() * availableMoves.length
            );
        }

        const currMove = availableMoves[randomMovesIndex];
        const currTurn = turn[randomTurnIndex];
        const currNotation = `${currMove}${currTurn}`;
        scramble += `${currNotation}  `;

        lastRandomIndex = randomMovesIndex;
    }

    return scramble;
};
