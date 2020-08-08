import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgos/mergeSort.js';
import './SortingVisuals.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'purple';

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
        for (let i = 0; i <NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(10,700));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations=getMergeSortAnimations(this.state.array);
        for (let i=0;i<animations.length;i++) {
            const arrayBars =document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
                }
        }
    }
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
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                        }}>
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
