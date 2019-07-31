// 1. Draw Tree
//
// A:
//         3
//        /  \
//       1    4
//       \     \
//        2     6
//             / \
//           5     9
//               /
//              7
//
// B:
//
//             E
//         /        \
//         A          S
//         \       /     \
//           E     Q       Y
//                / \     /
//               I   S   U
//                \      /
//                 O    T
//                /
//               N


//
// 2. Delete Root
//
// A:
//           4
//         /   \
//        1     6
//        \    / \
//         2   5   9
//               /
//              7
//
// B:
//
//
//           I
//       /        \
//       A          S
//       \       /     \
//         E     Q       Y
//              / \     /
//             O   S   U
//            /       /
//           N        T
//

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }

  insert(key, value) {
    // if the tree is empty, this new key being inserted will be the root
    if (!this.key) {
      this.key = key
      this.value = value
    }
    // If the tree already exists, then start traversing from the root
    // and compare it to the key we're inserting.
    // If the new key is less than the node's key, we'll traverse left
    else if (key <= this.key) {
      // What do we do if it's equal? In the previous exercises I defaulted by traversing left

      // if the existing node doesn't have a left child, this will be the left child
      if (!this.left) {
        this.left = new BinarySearchTree(key, value, this)
      }
      // if this nose has a left, then we'll traverse through it's left child down the tree
      else {
        this.left.insert(key, value)
      }
    }
    // if the new key is greater than the node, we'll traverse on the right
    else {
      if (!this.right) {
        this.right = new BinarySearchTree(key, value, this)
      }
      else {
        // keep searching
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value
    }
    else if (key < this.key && this.left) {
      return this.left.find(key)
    }
    else if (key > this.key && this.right) {
      return this.right.find(key)
    }
    else {
      throw new Error('Key Error')
    }
  }
  remove(key){
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }
      else if (this.left) {
        this._replaceWith(this.left)
      }
      else if (this.right) {
        this._replaceWith(this.right)
      }
      else {
        this._replaceWith(null)
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key)
    }
    else if (key > this.key && this.right) {
      this.right.remove(key)
    }
    else {
      throw new Error('Key Error')
    }
  }
  _replaceWith(node){
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node
      }
      else if (this == this.parent.right) {
        this.parent.right = node
      }
      if (node) {
        node.parent = this.parent
      }
    }
    else {
      if (node) {
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      }
      else {
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }

  _findMin(){
    if (!this.left) {
      return this
    }
    return this.left._findMin()
  }
  // This helps find the largest number
  _findMax(){
    if (!this.right) {
      return this
    }
    return this.right._findMax()
  }
}
// Exercise 5
function height(bst){
  if(!bst){
    return 0
  }
  else if(bst.left && bst.right){
    const left = height(bst.left)
    const right = height(bst.right)
    if(left > right){
      return 1 + left
    }
    else{
      return 1 + right
    }
  }
  else if(bst.left){
    return 1 + height(bst.left)
  }
  else if(bst.right){
    return 1 + height(bst.right)
  }

  return 1

}

// Exercise 6
function isItaBST(bst) {
  if ( (!bst.hasOwnProperty('left') && !bst.hasOwnProperty('right')) && ((!bst.hasOwnProperty('key') && !bst.hasOwnProperty('value')) && !bst.hasOwnProperty('parent')) ) {
    // if this argument doesn't have EACH of the necessary properties that define a BinarySearchTree, it's gotta be false
    return false
  }

  else {
    // This runs because it has ALL the necessary properties
    // Now we traverse down the tree and check the sub nodes

    if (bst.left && bst.right) {
      // if this is a parent of two nodes
      if(bst.left.value > bst.value || bst.right.value < bst.value) {
          // this runs if all the properties are there, but the values aren't aligned with the definition of a BinarySearchTree
          // all nodes in left-branches should be less than the value of their parent
          // all nodes on the right should be greater than the value of their parent
          return false
      }
      return (isItaBST(bst.left) && isItaBST(bst.right))
    }
    else if (bst.left) {
      if (bst.left.value > bst.value) {
        // checking again. if this node only has a left child, we need to make sure the logic still applies
        return false
      }
      // becomes falsy when there is no left child
      // however the property is still there, as checked by the first if statement
      return isItaBST(bst.left)
    }
    else if (bst.right) {
      if (bst.right.value < bst.value) {
        // right values can't be smaller than
        return false
      }
      // becomes falsy when there is no right child
      // however the property is still there, as checked by the first if statement
      return isItaBST(bst.right)
    }
    return true
  }


}

//Write an algorithm to find the third largest value in a binary search tree
function nth_largest(tree, state) { 
	//Finding the largest node means traversing the right first.
	if (tree.right) {
		nth_largest(tree.right, state);
		if (state.result) return;
	}
	if (!--state.n) { 
		//Found it.
		state.result = tree.key; 
		return;
	}
	if (tree.left) nth_largest(tree.left, state);
}

function third_largest(tree) {
	//Special case: empty tree.
	if (tree.key == null) 
		return null;
	let state = {n: 3, result: null};
	nth_largest(tree, state);
	return state.result;
}

//Implement a function to check if a tree is balanced (i.e. a tree where no two leaves differ 
//in distance from the root by more than one).
function isBalanced (tree) {
    if (!tree.left) {
        return !(tree.right && (tree.right.left || tree.right.right));
    }
    if (!tree.right) {
        return !(tree.left && (tree.left.left || tree.left.right));
    }
    return isBalanced(tree.left) && isBalanced(tree.right);
}

}

function main() {
  BST = new BinarySearchTree()

  // BST.insert(3, 3)
  // BST.insert(1, 1)
  // BST.insert(4, 4)
  // BST.insert(6, 6)
  // BST.insert(9, 9)
  // BST.insert(2, 2)
  // BST.insert(5, 5)
  // BST.insert(7, 7)

  BST.insert('E', 'E')
  BST.insert('A', 'A')
  BST.insert('S', 'S')
  BST.insert('Y', 'Y')
  BST.insert('Q', 'Q')
  BST.insert('U', 'U')
  BST.insert('E', 'E')
  BST.insert('S', 'S')
  BST.insert('T', 'T')
  BST.insert('I', 'I')
  BST.insert('O', 'O')
  BST.insert('N', 'N')

console.log(height(BST))
console.log(isItaBST(BST));


  // console.log(BST)
}

//4. It traverses down the tree and returns all of the values it can find. O(n)

main()
