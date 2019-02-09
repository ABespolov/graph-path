const assert = require('assert');
const solution = require('../src/solution.js');

const graph_1 = {
    start: {
        A: 50,
        B: 20
    },
    A: {
        C: 40,
        D: 20
    },
    B: {
        A: 90,
        D: 90
    },
    C: {
        D: 160,
        finish: 50
    },
    D: {
        finish: 20
    },
    finish: {}
};

const graph_2 = {
    start: {
        A: 50,
        B: 20
    },
    A: {
        C: 40
    },
    B: {
        A: 90,
        D: 90
    },
    C: {
        D: 160,
        finish: 50
    },
    D: {
        finish: 20
    },
    finish: {}
};

const graph_3 = {
    start: {
        A: 50,
    },
    A: {
        C: 40
    },
    B: {
        C: 90
    },
    C: {
        A: 160
    },
    D: {
        finish: 20
    },
    finish: {}
};

const start = 'start';
const finish = 'finish';

describe('find path', () => {
    it('should return correct distance and path', () => {
        assert.deepEqual({
                distance: 90,
                path: ['start', 'A', 'D', 'finish']
            },
            solution(graph_1, start, finish));
    });
    it('should return correct distance and path', () => {
        assert.deepEqual({
                distance: 130,
                path: ['start', 'B', 'D', 'finish']
            },
            solution(graph_2, start, finish));
    });
    it('incorrect graph, should throw error', () => {
        assert.throws(() => solution(graph_3, start, finish));
    });
});
