function knightMoves(start,end){
    let boardSize = 8;
    let validMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];

    function checkValidMove(row,col){
        return row >= 0 && row < boardSize && col >= 0 && col <boardSize;
    }

    function getPath(node, parents){
        const path = [node];
        while(parents[node.toString()]){
            node = parents[node.toString()];
            path.unshift(node);
        }
        return path;
    }

    const queue = [start];
    const visited = new Set();
    const parents = {};

    while(queue.length > 0){
        const current = queue.shift();

        if(current[0] === end[0] && current[1] === end[1]){
            return getPath(current,parents);
        }

        visited.add(current.toString());

        for(const move of validMoves){
            const newRow = current[0] + move[0];
            const newCol = current[1] + move[1];
            const nextMove = [newRow,newCol];

            if(checkValidMove(newRow,newCol) && !visited.has(nextMove.toString())) {
                queue.push(nextMove);
                parents[nextMove.toString()] = current;
            }
        }
    }
    return null;
}

const start = [3,3];
const end = [4,3];
const path = knightMoves(start,end);

if(path){
    console.log(`You made it in: ${path.length - 1} moves!`);
    path.forEach(move => console.log(`[${move}]`));
}else{
    console.log(`No path found from ${start} to ${end}`);
}