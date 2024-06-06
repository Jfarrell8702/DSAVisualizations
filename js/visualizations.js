function visualizeDataStructure(type) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // Clear previous visualization

    if (type === 'bst') {
        visualizeBST(container);
    } else if (type === 'linked-list') {
        visualizeLinkedList(container);
    } else if (type === 'graph') {
        visualizeGraph(container);
    }
    // Add more data structures as needed
}

function visualizeBST(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = {
        name: "50",
        children: [
            { name: "30", children: [{ name: "20" }, { name: "40" }] },
            { name: "70", children: [{ name: "60" }, { name: "80" }] }
        ]
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width, height - 100]);
    treeLayout(root);

    svg.selectAll('line')
        .data(root.links())
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y + 50)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y + 50)
        .attr('stroke', 'black');

    svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y + 50)
        .attr('r', 20)
        .attr('fill', 'lightblue');

    svg.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 55)
        .attr('dy', 5)
        .attr('text-anchor', 'middle')
        .text(d => d.data.name);
}

function visualizeLinkedList(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = ["10", "20", "30", "40", "50"];

    const spacing = width / (data.length + 1);

    const nodeGroup = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${(i + 1) * spacing}, ${height / 2})`);

    nodeGroup.append('circle')
        .attr('r', 20)
        .attr('fill', 'lightgreen');

    nodeGroup.append('text')
        .attr('dy', 5)
        .attr('text-anchor', 'middle')
        .text(d => d);

    nodeGroup.each(function(d, i) {
        if (i < data.length - 1) {
            svg.append('line')
                .attr('x1', (i + 1) * spacing + 20)
                .attr('y1', height / 2)
                .attr('x2', (i + 2) * spacing - 20)
                .attr('y2', height / 2)
                .attr('stroke', 'black');
        }
    });
}

function visualizeGraph(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
        { id: 6, name: 'F' },
        { id: 7, name: 'G' },
        { id: 8, name: 'H' },
        { id: 9, name: 'I' },
        { id: 10, name: 'J' }
    ];

    const links = [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 9 },
        { source: 9, target: 10 },
        { source: 10, target: 1 },
        { source: 1, target: 5 },
        { source: 2, target: 6 },
        { source: 3, target: 7 },
        { source: 4, target: 8 },
        { source: 5, target: 9 }
    ];

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));

    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', 'black');

    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 20)
        .attr('fill', 'orange')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    node.append('title')
        .text(d => d.name);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}


function visualizeAlgorithm(type) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // Clear previous visualization

    if (type === 'bubble-sort') {
        visualizeBubbleSort(container);
    } else if (type === 'quick-sort') {
        visualizeQuickSort(container);
    } else if (type === 'dijkstra') {
        visualizeDijkstra(container);
    }
    // Add more algorithms as needed
}

function visualizeBubbleSort(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [5, 3, 8, 4, 2];

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    const bars = svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', 'lightblue');

    async function bubbleSort(data) {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (data[j] > data[j + 1]) {
                    // Swap values
                    let temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                    await updateBars(data);
                }
            }
        }
    }

    function updateBars(data) {
        return new Promise(resolve => {
            bars.data(data)
                .transition()
                .duration(300)
                .attr('y', d => y(d))
                .attr('height', d => height - y(d))
                .on('end', resolve);
        });
    }

    bubbleSort(data);
}

function visualizeQuickSort(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [5, 3, 8, 4, 2, 7, 6, 1];

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    const bars = svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', 'lightblue');

    async function quickSort(data, left = 0, right = data.length - 1) {
        if (left < right) {
            let pivotIndex = await partition(data, left, right);
            await Promise.all([
                quickSort(data, left, pivotIndex - 1),
                quickSort(data, pivotIndex + 1, right)
            ]);
        }
    }

    async function partition(data, left, right) {
        let pivot = data[right];
        let i = left - 1;
        for (let j = left; j < right; j++) {
            if (data[j] < pivot) {
                i++;
                [data[i], data[j]] = [data[j], data[i]];
                await updateBars(data);
            }
        }
        [data[i + 1], data[right]] = [data[right], data[i + 1]];
        await updateBars(data);
        return i + 1;
    }

    function updateBars(data) {
        return new Promise(resolve => {
            bars.data(data)
                .transition()
                .duration(300)
                .attr('y', d => y(d))
                .attr('height', d => height - y(d))
                .on('end', resolve);
        });
    }

    quickSort(data);
}


function visualizeDijkstra(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = [
        { id: 'A', x: width * 0.5, y: height * 0.1 },
        { id: 'B', x: width * 0.7, y: height * 0.2 },
        { id: 'C', x: width * 0.9, y: height * 0.4 },
        { id: 'D', x: width * 0.8, y: height * 0.7 },
        { id: 'E', x: width * 0.6, y: height * 0.9 },
        { id: 'F', x: width * 0.4, y: height * 0.9 },
        { id: 'G', x: width * 0.2, y: height * 0.7 },
        { id: 'H', x: width * 0.1, y: height * 0.4 },
        { id: 'I', x: width * 0.3, y: height * 0.2 },
        { id: 'J', x: width * 0.5, y: height * 0.3 },
        { id: 'K', x: width * 0.6, y: height * 0.5 },
        { id: 'L', x: width * 0.4, y: height * 0.5 },
        { id: 'M', x: width * 0.5, y: height * 0.7 },
        { id: 'N', x: width * 0.3, y: height * 0.6 },
        { id: 'O', x: width * 0.7, y: height * 0.6 }
    ];

    const edges = [
        { source: 'A', target: 'B', weight: 1 },
        { source: 'A', target: 'I', weight: 2 },
        { source: 'B', target: 'C', weight: 1 },
        { source: 'C', target: 'D', weight: 3 },
        { source: 'D', target: 'E', weight: 2 },
        { source: 'E', target: 'F', weight: 1 },
        { source: 'F', target: 'G', weight: 2 },
        { source: 'G', target: 'H', weight: 3 },
        { source: 'H', target: 'I', weight: 1 },
        { source: 'I', target: 'J', weight: 2 },
        { source: 'J', target: 'K', weight: 1 },
        { source: 'J', target: 'L', weight: 1 },
        { source: 'K', target: 'C', weight: 1 },
        { source: 'K', target: 'M', weight: 2 },
        { source: 'L', target: 'N', weight: 2 },
        { source: 'M', target: 'O', weight: 2 },
        { source: 'N', target: 'G', weight: 1 },
        { source: 'O', target: 'D', weight: 1 },
        { source: 'O', target: 'B', weight: 1 }
    ];

    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const edgeMap = new Map(edges.map(edge => [edge.source + '-' + edge.target, edge.weight]));

    svg.selectAll('line')
        .data(edges)
        .enter().append('line')
        .attr('x1', d => nodeMap.get(d.source).x)
        .attr('y1', d => nodeMap.get(d.source).y)
        .attr('x2', d => nodeMap.get(d.target).x)
        .attr('y2', d => nodeMap.get(d.target).y)
        .attr('stroke', 'black');

    svg.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('fill', 'orange');

    svg.selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 5)
        .attr('text-anchor', 'middle')
        .text(d => d.id);

    async function dijkstra(source) {
        const distances = new Map(nodes.map(node => [node.id, Infinity]));
        distances.set(source, 0);
        const visited = new Set();
        const pq = new PriorityQueue((a, b) => distances.get(a) < distances.get(b));
        pq.enqueue(source);

        while (!pq.isEmpty()) {
            const current = pq.dequeue();
            visited.add(current);

            for (const neighbor of getNeighbors(current)) {
                if (!visited.has(neighbor)) {
                    const newDist = distances.get(current) + edgeMap.get(current + '-' + neighbor);
                    if (newDist < distances.get(neighbor)) {
                        distances.set(neighbor, newDist);
                        pq.enqueue(neighbor);
                    }
                }
            }

            await updateVisualization(distances);
        }
    }

    function getNeighbors(node) {
        return edges.filter(edge => edge.source === node).map(edge => edge.target);
    }

    function updateVisualization(distances) {
        return new Promise(resolve => {
            svg.selectAll('circle')
                .transition()
                .duration(500)
                .attr('fill', d => distances.get(d.id) === Infinity ? 'orange' : 'lightgreen')
                .on('end', resolve);
        });
    }

    class PriorityQueue {
        constructor(comparator) {
            this._comparator = comparator;
            this._elements = [];
        }

        enqueue(element) {
            this._elements.push(element);
            this._elements.sort(this._comparator);
        }

        dequeue() {
            return this._elements.shift();
        }

        isEmpty() {
            return this._elements.length === 0;
        }
    }

    dijkstra('A');
}

function visualizeDataStructure(type) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // Clear previous visualization

    if (type === 'bst') {
        visualizeBST(container);
    } else if (type === 'linked-list') {
        visualizeLinkedList(container);
    } else if (type === 'graph') {
        visualizeGraph(container);
    } else if (type === 'stack') {
        visualizeStack(container);
    } else if (type === 'queue') {
        visualizeQueue(container);
    } else if (type === 'heap') {
        visualizeHeap(container);
    } else if (type === 'hash-table') {
        visualizeHashTable(container);
    }
    // Add more data structures as needed
}

function visualizeAlgorithm(type) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // Clear previous visualization

    if (type === 'bubble-sort') {
        visualizeBubbleSort(container);
    } else if (type === 'quick-sort') {
        visualizeQuickSort(container);
    } else if (type === 'dijkstra') {
        visualizeDijkstra(container);
    } else if (type === 'dfs') {
        visualizeDFS(container);
    } else if (type === 'greedy') {
        visualizeGreedyAlgorithm(container);
    } else if (type === 'divide-conquer') {
        visualizeDivideAndConquer(container);
    }
    // Add more algorithms as needed
}

// Stack Visualization
function visualizeStack(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = ["A", "B", "C", "D", "E"];

    const stackGroup = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${width / 2 - 50}, ${(height / 2 - (i * 50))})`);

    stackGroup.append('rect')
        .attr('width', 100)
        .attr('height', 40)
        .attr('fill', '#00ff41')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2);

    stackGroup.append('text')
        .attr('x', 50)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d);
}

// Queue Visualization
function visualizeQueue(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = ["A", "B", "C", "D", "E"];

    const queueGroup = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${(i * 100) + 50}, ${height / 2})`);

    queueGroup.append('rect')
        .attr('width', 80)
        .attr('height', 40)
        .attr('fill', '#00ff41')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2);

    queueGroup.append('text')
        .attr('x', 40)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d);
}

// Heap Visualization
function visualizeHeap(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = ["A", "B", "C", "D", "E", "F", "G"];

    const treeLayout = d3.tree().size([width, height - 100]);
    const root = d3.stratify()
        .id(d => d)
        .parentId(d => (d.charCodeAt(0) - 1) > 64 ? String.fromCharCode(d.charCodeAt(0) - 1) : null)(data);

    treeLayout(root);

    const links = svg.selectAll('line')
        .data(root.links())
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y + 50)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y + 50)
        .attr('stroke', '#ffffff');

    const nodes = svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y + 50)
        .attr('r', 20)
        .attr('fill', '#00ff41');

    svg.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 55)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d.id);
}

// Hash Table Visualization
function visualizeHashTable(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [
        { key: "A", value: "1" },
        { key: "B", value: "2" },
        { key: "C", value: "3" },
        { key: "D", value: "4" },
        { key: "E", value: "5" }
    ];

    const hashTableGroup = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${(i * 150) + 50}, ${height / 2})`);

    hashTableGroup.append('rect')
        .attr('width', 140)
        .attr('height', 40)
        .attr('fill', '#00ff41')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2);

    hashTableGroup.append('text')
        .attr('x', 20)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d.key);

    hashTableGroup.append('text')
        .attr('x', 100)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d.value);
}

// DFS Visualization
function visualizeDFS(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = [
        { id: 'A', x: width * 0.5, y: height * 0.1 },
        { id: 'B', x: width * 0.7, y: height * 0.2 },
        { id: 'C', x: width * 0.9, y: height * 0.4 },
        { id: 'D', x: width * 0.8, y: height * 0.7 },
        { id: 'E', x: width * 0.6, y: height * 0.9 },
        { id: 'F', x: width * 0.4, y: height * 0.9 },
        { id: 'G', x: width * 0.2, y: height * 0.7 },
        { id: 'H', x: width * 0.1, y: height * 0.4 },
        { id: 'I', x: width * 0.3, y: height * 0.2 }
    ];

    const edges = [
        { source: 'A', target: 'B' },
        { source: 'A', target: 'I' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'F' },
        { source: 'F', target: 'G' },
        { source: 'G', target: 'H' },
        { source: 'H', target: 'I' }
    ];

    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    svg.selectAll('line')
        .data(edges)
        .enter().append('line')
        .attr('x1', d => nodeMap.get(d.source).x)
        .attr('y1', d => nodeMap.get(d.source).y)
        .attr('x2', d => nodeMap.get(d.target).x)
        .attr('y2', d => nodeMap.get(d.target).y)
        .attr('stroke', '#ffffff');

    svg.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('fill', '#00ff41');

    svg.selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d.id);

    async function dfsTraversal(nodeId, visited = new Set()) {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        svg.selectAll('circle')
            .filter(d => d.id === nodeId)
            .transition()
            .duration(500)
            .attr('fill', 'lightgreen');
        await new Promise(resolve => setTimeout(resolve, 500));

        const neighbors = edges.filter(edge => edge.source === nodeId).map(edge => edge.target);
        for (const neighbor of neighbors) {
            await dfsTraversal(neighbor, visited);
        }
    }

    dfsTraversal('A');
}

// Greedy Algorithm Visualization
function visualizeGreedyAlgorithm(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = [
        { id: 'A', x: width * 0.5, y: height * 0.1 },
        { id: 'B', x: width * 0.7, y: height * 0.2 },
        { id: 'C', x: width * 0.9, y: height * 0.4 },
        { id: 'D', x: width * 0.8, y: height * 0.7 },
        { id: 'E', x: width * 0.6, y: height * 0.9 },
        { id: 'F', x: width * 0.4, y: height * 0.9 },
        { id: 'G', x: width * 0.2, y: height * 0.7 },
        { id: 'H', x: width * 0.1, y: height * 0.4 },
        { id: 'I', x: width * 0.3, y: height * 0.2 }
    ];

    const edges = [
        { source: 'A', target: 'B' },
        { source: 'A', target: 'I' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'F' },
        { source: 'F', target: 'G' },
        { source: 'G', target: 'H' },
        { source: 'H', target: 'I' },
        { source: 'A', target: 'F' },
        { source: 'B', target: 'G' },
        { source: 'C', target: 'H' }
    ];

    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    svg.selectAll('line')
        .data(edges)
        .enter().append('line')
        .attr('x1', d => nodeMap.get(d.source).x)
        .attr('y1', d => nodeMap.get(d.source).y)
        .attr('x2', d => nodeMap.get(d.target).x)
        .attr('y2', d => nodeMap.get(d.target).y)
        .attr('stroke', '#ffffff');

    svg.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('fill', '#00ff41');

    svg.selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .text(d => d.id);

    async function greedyAlgorithm(nodeId, visited = new Set()) {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        svg.selectAll('circle')
            .filter(d => d.id === nodeId)
            .transition()
            .duration(500)
            .attr('fill', 'lightgreen');
        await new Promise(resolve => setTimeout(resolve, 500));

        const neighbors = edges.filter(edge => edge.source === nodeId).map(edge => edge.target);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                await greedyAlgorithm(neighbor, visited);
            }
        }
    }

    greedyAlgorithm('A');
}

// Divide and Conquer Visualization
function visualizeDivideAndConquer(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [30, 20, 50, 10, 60, 40, 70];
    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width])
        .padding(0.1);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', '#00ff41');

    async function divideAndConquer(arr, start, end) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        await new Promise(resolve => setTimeout(resolve, 500));

        await divideAndConquer(arr, start, mid);
        await divideAndConquer(arr, mid + 1, end);

        svg.selectAll('rect')
            .filter((d, i) => i >= start && i <= end)
            .transition()
            .duration(500)
            .attr('fill', 'lightgreen');
        await new Promise(resolve => setTimeout(resolve, 500));

        const merged = merge(arr, start, mid, end);
        for (let i = start; i <= end; i++) {
            arr[i] = merged[i - start];
        }

        svg.selectAll('rect')
            .data(arr)
            .transition()
            .duration(500)
            .attr('y', d => y(d))
            .attr('height', d => height - y(d))
            .attr('fill', '#00ff41');
    }

    function merge(arr, start, mid, end) {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let leftIndex = 0, rightIndex = 0, mergedIndex = 0;
        const merged = [];

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                merged[mergedIndex++] = left[leftIndex++];
            } else {
                merged[mergedIndex++] = right[rightIndex++];
            }
        }

        while (leftIndex < left.length) {
            merged[mergedIndex++] = left[leftIndex++];
        }

        while (rightIndex < right.length) {
            merged[mergedIndex++] = right[rightIndex++];
        }

        return merged;
    }

    divideAndConquer(data, 0, data.length - 1);
}
