class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    // If the tree is empty, set the new node as the root
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    // Start from the root and traverse the tree to find the correct position
    let current = this.root;

    while (true) {
      // If the value is less than the current node, go left
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      }
      // If the value is greater than or equal to the current node, go right
      else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    const newNode = new Node(val);

    // If the tree is empty, set the new node as the root
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    // If the value is less than the current node, go left
    if (val < current.val) {
      if (!current.left) {
        current.left = newNode;
        return this;
      }
      // Recurse into the left subtree
      return this.insertRecursively(val, current.left);
    }
    // If the value is greater than or equal to the current node, go right
    else {
      if (!current.right) {
        current.right = newNode;
        return this;
      }
      // Recurse into the right subtree
      return this.insertRecursively(val, current.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    // Traverse the tree
    while (current) {
      if (val === current.val) {
        return current;
      }
      // Move left or right based on the value comparison
      if (val < current.val) {
        current = current.left;
      }
      else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) {
      return undefined;
    }
    // If the value matches the current node, return the node
    if (val === current.val) {
      return current;
    }

    if (val < current.val) {
      // Recurse left if the value is smaller than the current node's value
      return this.findRecursively(val, current.left);
    } else {
      // Recurse right if the value is greater than the current node's value
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];

    function traverse(node) {
      if (!node) return;  // do nothing if node is null

      result.push(node.val);  // Visit the current node
      traverse(node.left);  // Recurse into the left subtree
      traverse(node.right);  // Recurse into the right subtree
    }

    traverse(this.root); // Start traversal from the root

    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];

    function traverse(node) {
      if (!node) return;  // do nothing if node is null

      traverse(node.left);  // Recurse into the left subtree
      result.push(node.val);  // Visit the current node
      traverse(node.right);  // Recurse into the right subtree
    }

    traverse(this.root); // Start traversal from the root

    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];

    function traverse(node) {
      if (!node) return;  // do nothing if node is null

      traverse(node.left);  // Recurse into the left subtree
      traverse(node.right);  // Recurse into the right subtree
      result.push(node.val);  // Visit the current node
    }

    traverse(this.root); // Start traversal from the root

    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length) {
      const current = queue.shift(); // Remove the first node from the queue
      result.push(current.val);   // Add the value of the current node to the result

      // Add the left child to the queue if it exists
      if (current.left) {
        queue.push(current.left);
      }

      // Add the right child to the queue if it exists
      if (current.right) {
        queue.push(current.right);
      }
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // Helper function to find the minimum value node in a subtree
    function findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }

    // Helper function to remove a node
    function removeNode(node, val) {
      if (!node) return null;

      if (val < node.val) {
        // Recur left
        node.left = removeNode(node.left, val);
      } else if (val > node.val) {
        // Recur right
        node.right = removeNode(node.right, val);
      } else {
        // Node with no children (leaf node)
        if (!node.left && !node.right) {
          return null;
        }

        // Node with one child
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        // Node with two children
        const minNode = findMin(node.right);
        node.val = minNode.val;
        node.right = removeNode(node.right, minNode.val);
      }
      return node;
    }

    this.root = removeNode(this.root, val);
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    // Helper function to check the height of a subtree
    function checkHeight(node) {
      if (!node) return 0;

      // Recursively calculate the height of the left and right subtrees
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);

      if (leftHeight === -1 || rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }

    // Start the recursive check from the root
    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    // Traverse to the rightmost node (the largest value)
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // The largest node has a left subtree
    if (current.left) {
      let secondHighest = current.left;

      // Find the largest value in the left subtree
      while (secondHighest.right) {
        secondHighest = secondHighest.right;
      }

      return secondHighest.val;
    }
    // The largest node does not have a left subtree
    return parent.val;
  }
}

module.exports = BinarySearchTree;
