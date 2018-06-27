import React, { Component } from 'react';

class ZipEditor extends Component {
    state = {
        zips: []
    }

    componentDidMount() {
        if (this.props.zips) {
            this.setState({
                zips: this.props.zips
            });
        }
    }

    updateZip = (zipObj, key) => {
        let zips = this.state.zips;
        zips[key] = {
            ...zips[key],
            ...zipObj
        };

        this.setState({
            zips: zips
        })
    }

    saveZipChanges = () => {
        this.props.updateZips(this.state.zips);
    }

    render() {
        const zips = this.state.zips;

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Zip Code</th>
                            <th>Price</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            zips.map((zip, key) => {
                                return (
                                    <tr>
                                        <td>
                                            <input type="text" onChange={(e) => {
                                                const value = e.target.value;
                                                zip.value = value;
                                                this.updateZip({ value: value }, key)
                                            }} value={zip.value} />
                                        </td>
                                        <td>
                                            <input type="number" onChange={(e) => {
                                                const price = e.target.value;
                                                zip.price = price;
                                                this.updateZip({ price: price }, key)
                                            }} value={zip.price} />
                                        </td>
                                        <td>
                                            <input type="text" onChange={(e) => {
                                                const city = e.target.value;
                                                zip.city = city;
                                                this.updateZip({ city, city }, key)
                                            }} value={zip.city} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button type="button" onClick={this.props.onCancel} className="btn btn-cancel">Cancel</button>
                <button type="button" className="btn btn-save" onClick={this.saveZipChanges}>Save Changes</button>
            </div>
        )
    }
}

export default ZipEditor;