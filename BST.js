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


}
