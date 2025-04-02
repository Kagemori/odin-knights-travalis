import { Node } from "./node.js";

function mergeSort(inputArray){
    if(inputArray.length <= 1){
        return inputArray;
    }

    const midpoint = Math.floor(inputArray.length / 2);
    const leftSide = mergeSort(inputArray.slice(0,midpoint));
    const rightSide = mergeSort(inputArray.slice(midpoint));

    let result = []
    let i = 0, j = 0;

    while(i < leftSide.length && j < rightSide.length) {
        if (leftSide[i] < rightSide[j]) {
            result.push(leftSide[i]);
            i++;
        }else{
            result.push(rightSide[j]);
            j++;
        }
    }

    return result.concat(leftSide.slice(i), rightSide.slice(j));
}

class Tree {
    constructor(){
        this.root = null;
    }

    buildTree(array){
        // Takes array as input
        // Remove duplicate numbers
        // Sort array
        // Balanced Node Tree
        // Return root node

        let duparr = [...new Set(array)];
        let sortedarr = mergeSort(duparr);
        this.root = this.insert(this.root, sortedarr[Math.floor(sortedarr.length/2)])
        sortedarr.forEach(element => {
            this.root = this.insert(this.root, element);
        });
    }

    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(root, value){
        if(root === null){
            return new Node(value);
        }

        if (root.value == value){
            return root;
        }

        if(value < root.value){
            root.left = this.insert(root.left, value);
        }else if(value > root.value){
            root.right = this.insert(root.right, value);
        }

        return root;
    }

    deleteItem(root, value){
        if(root === null){
            return root;
        }

        if(root.value > value){
            root.left = this.deleteItem(root.left,value);
        }else if(root.value < value){
            root.right = this.deleteItem(root.right, value);
        }else{
            if(root.left === null){
                return root.right;
            }

            if(root.right === null){
                return root.left;
            }

            let successor = this.getSuccessor(root);
            root.value = successor.value;
            root.right = this.deleteItem(root.right, successor.value);
        }
        return root;
    }

    getSuccessor(current){
        current = current.right;
        while(current !== null && current.left !== null){
            current = current.left;
        }
        return current;
    }

    find(value, node = this.root){
        if(!node || node.value === value){
            return node;
        }
        return value < node.value ? this.find(value,node.left) : this.find(value,node.right);
    }

    levelOrder(){
        if(!this.root){
            return [];
        }

        let result = [];
        let queue = [this.root];

        while(queue.length > 0){
            let current = queue.shift();
            result.push(current.value);

            if(current.left){
                queue.push(current.left);
            }

            if(current.right){
                queue.push(current.right);
            }
        }

        return result;
    }

    inOrder(node = this.root){
        if(!node){
            return [];
        }

        let result = this.inOrder(node.left);
        result.push(node.value);
        result = result.concat(this.inOrder(node.right));

        return result;
    }

    preOrder(node = this.root){
        if(!node){
            return [];
        }

        let result = [node.value];
        result = result.concat(this.preOrder(node.left));
        result = result.concat(this.preOrder(node.right));

        return result;
    }

    postOrder(node = this.root){
        if(!node){
            return [];
        }

        let result = this.postOrder(node.left);
        result = result.concat(this.postOrder(node.right));
        result.push(node.value);

        return result;
    }

    height(node){
        if(!node){
            return 0;
        }

        if(node.left === null && node.right === null){
            return 1;
        }

        let leftHeight = node.left ? this.height(node.left) : 0;
        let rightHeight = node.right ? this.height(node.right) : 0;

        return 1 + Math.max(leftHeight,rightHeight);
    }

    depth(node,target, depth=0){
        if(node === null){
            return -1;
        }
        if(node.value == target) {
            return depth;
        }else if(target < node.value){
            return this.depth(node.left,target,depth + 1);
        }else{
            return this.depth(node.right,target,depth + 1);
        }
    }

    isBalanced(){
        function check(node){
            if(!node){
                return 0;
            }

            let leftHeight = check(node.left);
            if(leftHeight === -1){
                return -1;
            }

            let rightHeight = check(node.right);
            if(rightHeight === -1){
                return -1;
            }

            if(Math.abs(leftHeight - rightHeight) > 1){
                return -1;
            }

            return 1 + Math.max(leftHeight,rightHeight);
        }
        return check(this.root) !== -1;
    }

    //////////////////

    toSort(node = this.root, sortedarr = []) {
        if(node){
            this.toSort(node.left,sortedarr);
            sortedarr.push(node.value);
            this.toSort(node.right,sortedarr)
        }
        return sortedarr;
    }

    buildBalance(arr, start = 0, end = arr.length - 1){
        if(start > end){
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);

        root.left = this.buildBalance(arr, start, mid - 1);
        root.right = this.buildBalance(arr,mid + 1, end);

        return root;
    }

    rebalance(){
        let sortedarr = this.toSort();
        return this.buildBalance(sortedarr);
    }
}

export { Tree };