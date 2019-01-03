/* eslint-disable no-restricted-globals */
import {withFirestore} from 'react-firestore';
import React from 'react';
import {AreaChart} from 'react-easy-chart';
import ListMesurements from './ListMesurements';
import {getData} from './../utils/ParseData'

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

    render() {
        const {measurements} = this.state;
        const measurementsData = measurements ? measurements.data() : null;

        return measurementsData ? (
            <div className="Display">
                <ListMesurements measurementsData={measurementsData}/>
                <AreaChart
                    data={getData(measurementsData)}
                    xType={'text'}
                    width={window.innerWidth - window.innerWidth * 0.1}
                    height={window.innerHeight - window.innerHeight * 0.2}
                    axisLabels={{x: 'Date', y: 'Degree'}}
                    interpolate={'cardinal'}
                    yDomainRange={[-10, 10]}
                    axes
                    xTicks={16}
                    yTicks={9}
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