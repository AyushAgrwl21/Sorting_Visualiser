import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgos/mergeSort.js';
import {getQuickSortAnimations} from '../sortingAlgos/quickSort.js';
import {getHeapSortAnimations} from '../sortingAlgos/heapSort.js';
import {getBubbleSortAnimations} from '../sortingAlgos/bubbleSort.js';
import './SortingVisuals.css';

//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;
// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;
// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'purple';
//Tooltips for buttons
const DISABLED_BUTTON = "Currently Disabled"
const ENABLED_BUTTON = {
    nlogn: "O(NlogN) Time Complexity",
    nSquare: "O(N^2) Time Complexity"
}
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
        this.restoreSortButtons();
    }
    disableSortButtons() {
        document.getElementById("mergeSort").disabled = true;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("bubbleSort").disabled = true;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
    }
    restoreSortButtons() {
        document.getElementById("mergeSort").disabled = false;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("bubbleSort").disabled = false;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";
    }

    mergeSort() {
        this.disableSortButtons();
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
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 8000);
         setTimeout(() => this.restoreSortButtons(), RESTORE_TIME);  
    }

    quickSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
         const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 10000);
         setTimeout(() => this.restoreSortButtons(), RESTORE_TIME);  
    }

    heapSort() {}
    bubbleSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    //insertionSort() {}
    //selectionSort() {}

    render() {
        const {array} = this.state;

        return (
            <>
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
            </div>
            
            <div className="buttons" > 
                <button title="Generates a new random array" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.resetArray()}>
                    Generate New Array
                </button>
                <button title="O(NlogN) Time Complexity" id = "mergeSort" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.mergeSort()}>
                    Merge Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "quickSort" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.quickSort()}>
                    Quick Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "bubbleSort" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.bubbleSort()}>
                    Bubble Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "insertionSort" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.insertionSort()}>
                    Insertion Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "selectionSort" style={{position:'relative',top:`${0*(WINDOW_HEIGHT-20)/6}px`}} onClick={() => this.selectionSort()}>
                    Selection Sort
                </button>
            </div>   
            </> 
        );
    }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
