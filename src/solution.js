const findLowestCostNode = (costs, processed) => {
  const knownNodes = Object.keys(costs);
  const lowestCostNode = knownNodes.reduce((lowest, node) => {
    let currLowest = lowest;
    if (currLowest === null && !processed.includes(node)) {
      currLowest = node;
    }
    if (costs[node] < costs[currLowest] && !processed.includes(node)) {
      currLowest = node;
    }
    return currLowest;
  }, null);

  return lowestCostNode;
};

const solution = (graph, start, finish) => {
  const trackedCosts = Object.assign({ finish: Infinity }, graph.start);
  const trackedParents = { finish: null };
  const graphArray = Object.keys(graph.start);

  for (let i = 0; i < graphArray.length; i += 1) {
    trackedParents[graphArray[i]] = start;
  }
  const processedNodes = [];
  let node = findLowestCostNode(trackedCosts, processedNodes);

  while (node) {
    const costToReachNode = trackedCosts[node];
    const childrenOfNode = graph[node];
    const childrenOfNodeArray = Object.keys(childrenOfNode);

    for (let i = 0; i < childrenOfNodeArray.length; i += 1) {
      const costFromNodetoChild = childrenOfNode[childrenOfNodeArray[i]];
      const costToChild = costToReachNode + costFromNodetoChild;

      if (!trackedCosts[childrenOfNodeArray[i]]
        || trackedCosts[childrenOfNodeArray[i]] > costToChild) {
        trackedCosts[childrenOfNodeArray[i]] = costToChild;
        trackedParents[childrenOfNodeArray[i]] = node;
      }
    }

    processedNodes.push(node);

    node = findLowestCostNode(trackedCosts, processedNodes);
  }

  const optimalPath = [finish];
  let parent = trackedParents.finish;

  while (parent) {
    optimalPath.push(parent);
    parent = trackedParents[parent];
  }
  optimalPath.reverse();

  if (trackedCosts.finish === Infinity) {
    throw new Error('Error: No Path');
  }

  const results = {
    distance: trackedCosts.finish,
    path: optimalPath,
  };

  return results;
};

module.exports = solution;
