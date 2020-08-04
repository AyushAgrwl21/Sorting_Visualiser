import React from 'react';
import './SortingVisuals.css';

export default class SortingVisuals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }
    // To generate a new array on start and when refreshed
    resetArray() {
        const array = [];
        for (let i = 0; i <200; i++) {
            array.push(randomIntFromInterval(10,700));
        }
        this.setState({array});
    }

    mergeSort() {}
    quickSort() {}
    heapSort() {}
    bubbleSort() {}
    //insertionSort() {}
    //selectionSort() {}

    render() {
        const {array} = this.state;

        return (
            <div className='array-container'>
            {array.map((value, idx) => (
                <div 
                    className="array-bar" 
                    key = {idx}
                    style={{height: `${value}px`}}>
                </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
        );
    }
}
//<button onClick={() => this.insertionSort()}>Insertion Sort</button>
//<button onClick={() => this.selectionSort()}>Selection Sort</button>

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
