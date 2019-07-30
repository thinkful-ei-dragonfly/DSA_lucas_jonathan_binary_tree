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
}

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


  // console.log(BST)
}

//4. It traverses down the tree and returns all of the values it can find. O(n)

main()


