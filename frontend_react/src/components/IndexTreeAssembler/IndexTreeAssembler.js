class IndexTreeAssembler {
  assemble(text) {
    const indexTree = new Node("indexTree");

    if(text === undefined)
      return indexTree;

    const textLines = text.split('\n');

    let currentGeneration = 0;
    let currentGenerationIndentation = 0;
    let currentParentAtGenerationMap = new Map();
    currentParentAtGenerationMap.set(0, indexTree);

    for(const textLine of textLines) {
      const tabsRegex = /(?<=^\t*)\t/g; // matches every tab at the start of the line
      const currentNodeIndentation = this._countMatches(textLine, tabsRegex);
      let currentGenerationCurrentParent = null;

      if(currentNodeIndentation > currentGenerationIndentation) {
        currentGeneration += 1;
        currentGenerationIndentation = currentNodeIndentation;
      }
      else if(currentNodeIndentation < currentGenerationIndentation) {
        currentGeneration = currentGeneration + (currentNodeIndentation - currentGenerationIndentation);
        currentGenerationIndentation = currentNodeIndentation;
      }
      let node = new Node(textLine);
      currentParentAtGenerationMap.set(currentGeneration+1, node);
      currentGenerationCurrentParent = currentParentAtGenerationMap.get(currentGeneration);
      currentGenerationCurrentParent.add(node);
    }
    return indexTree;
  }

  _countMatches(string, regex) {
    return ((string || '').match(regex) || []).length;
  }
}

class Node {
  constructor(name) {
    this.children = [];
    this.name = name;
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const length = this.children.length;
    for (let i = 0; i < length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        return;
      }
    }
  }

  getChild(index) {
    return this.children[index];
  }

  hasChildren () {
    return this.children.length > 0;
  }
}

export default IndexTreeAssembler;