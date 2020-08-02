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
        for (let i = 0;i < 200; i++) {
            array.push(randomIntFromInterval(10,700));
        }
        this.setState({array});
    }

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
            </div>
        );
    }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
