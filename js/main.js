document.getElementById('visualize-ds-btn').addEventListener('click', () => {
    const selectedDataStructure = document.getElementById('data-structure-selector').value;
    visualizeDataStructure(selectedDataStructure);
});

document.getElementById('visualize-alg-btn').addEventListener('click', () => {
    const selectedAlgorithm = document.getElementById('algorithm-selector').value;
    if (selectedAlgorithm === 'dijkstra') {
        document.getElementById('dijkstra-inputs').style.display = 'block';
    } else {
        document.getElementById('dijkstra-inputs').style.display = 'none';
    }
    visualizeAlgorithm(selectedAlgorithm);
});

document.getElementById('run-dijkstra-btn').addEventListener('click', () => {
    const startNode = document.getElementById('start-node').value;
    const endNode = document.getElementById('end-node').value;
    runDijkstraVisualization(startNode, endNode);
});
