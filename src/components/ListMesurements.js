import React from 'react';
import Modal from 'react-modal';
import {getData} from "../utils/ParseData";
import './../style/ListMesurements.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth/2
    }
};

// Modal.setAppElement('#App');

class ListMesurements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            measurementsData: props.measurementsData,
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        console.log(props);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderTable = (data) => {
        return <div>
            <table className={"container"}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(value => {
                        return (
                            <tr>
                                <td>{value.x}</td>
                                <td>{value.y}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    };

    render() {
        return (
            <div>
                <button onClick={this.openModal}>Show Table View</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Measurements Table"
                >
                    <div>{this.renderTable(getData(this.state.measurementsData)[0])}</div>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}

export default ListMesurements;