import {withFirestore} from "react-firestore";
import React from "react";
import {AreaChart} from 'react-easy-chart';

class Display extends React.Component {
    state = {
        measurements: null,
    };

    componentDidMount() {
        const {firestore} = this.props;

        firestore.doc('minden_mentes/yeZP7IFsuiczNrKnfqJJ').onSnapshot(snapshot => {
            this.setState({measurements: snapshot});
        });
    }

    mouseOverHandler(d, e){
        this.setState({
            showToolTip: true,
            top: `${e.screenY - 10}px`,
            left: `${e.screenX + 10}px`,
            y: d.y,
            x: d.x
        });
    }

    mouseMoveHandler(e){
        if (this.state.showToolTip) {
            this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
        }
    }

    mouseOutHandler(){
        this.setState({ showToolTip: false });
    }


    render() {
        const {measurements} = this.state;
        const measurementsData = measurements ? measurements.data() : null;
        const map = {
            'Measurement':
                {
                    'date': 'x',
                    'temp': 'y'
                }
        };

        function convert(date) {
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
                timeZone: 'America/Los_Angeles'
            };
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        }

        function getData(measurementsData) {
            let data = [];
            if (measurementsData) {
                data = measurementsData['measurements'];

                for (let m = 0; m <= data.length; m++) {
                    for (let prop in data[m]) {
                        if (data[m].hasOwnProperty(prop) && prop in map.Measurement) {
                            data[m][map.Measurement[prop]] = prop === 'date' ? convert(data[m][prop]) : data[m][prop];
                            delete data[m][prop];
                        }
                    }
                }

                data = [data];
            }
            return data;
        }

        return measurementsData ? (
            <div className="Display">
                <AreaChart
                    data={getData(measurementsData)}
                    xType={'text'}
                    width={1000}
                    height={400}
                    // mouseOverHandler={this.mouseOverHandler}
                    // mouseOutHandler={this.mouseOutHandler}
                    // mouseMoveHandler={this.mouseMoveHandler}
                    axisLabels={{x: 'Date', y: 'Degree'}}
                    interpolate={'cardinal'}
                    yDomainRange={[-10, 10]}
                    axes
                    xTicks={5}
                    yTicks={3}
                    dataPoints
                    grid
                    areaColors={['#61DAFB', 'purple']}
                    style={{
                        '.Area0': {
                            stroke: 'green'
                        }
                    }}
                />
            </div>
        ) : (
            <div>Loading</div>
        );
    }
}

export default withFirestore(Display);