document.getElementById('visualize-ds-btn').addEventListener('click', () => {
    const selectedDataStructure = document.getElementById('data-structure-selector').value;
    visualizeDataStructure(selectedDataStructure);
});

document.getElementById('visualize-alg-btn').addEventListener('click', () => {
    const selectedAlgorithm = document.getElementById('algorithm-selector').value;
    visualizeAlgorithm(selectedAlgorithm);
});
