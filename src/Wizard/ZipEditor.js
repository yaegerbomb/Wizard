import React, { Component } from 'react';

class ZipEditor extends Component {
    state = {
        zips: [],
        filteredZips: [],
        search: ""
    }

    componentDidMount() {
        if (this.props.zips) {
            this.setState({
                zips: this.props.zips,
                filteredZips: this.props.zips
            });
        }
    }

    findZipKey = (zipToFind) => {
        let key = -1;
        const { zips } = this.state;
        zips.forEach((zip, index) => {
            if (zip.value === zipToFind.value) {
                key = index;
            }
        });

        return key;
    }

    updateZip = (zip, zipObj, filteredKey) => {
        const key = this.findZipKey(zip);
        let filteredZips = this.state.filteredZips;
        filteredZips[filteredKey] = {
            ...filteredZips[filteredKey],
            ...zipObj
        }

        let zips = this.state.zips;
        zips[key] = {
            ...zips[key],
            ...zipObj
        };

        this.setState({
            zips: zips,
            filteredZips: filteredZips
        })
    }

    saveZipChanges = () => {
        this.props.updateZips(this.state.zips);
    }

    filterZips = (searchString) => {
        if (searchString) {
            let filteredZips = this.state.filteredZips;
            filteredZips = filteredZips.filter((zip => zip.value.indexOf(searchString) !== -1));
            this.setState({
                filteredZips: filteredZips,
                search: searchString
            })
        } else {
            this.setState({
                filteredZips: this.state.zips,
                search: ""
            })
        }
    }

    render() {
        const zips = this.state.filteredZips;
        const search = this.state.search;

        return (
            <div>
                <div className="search-container">
                    <label>Search Zips: </label>
                    <input type="text" defaultValue={search} onChange={(e) => this.filterZips(e.target.value)} />
                </div>
                <table className="table">
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
                            zips.map((zip, filteredKey) => {
                                return (
                                    <tr>
                                        <td>
                                            <input type="text" onChange={(e) => {
                                                const value = e.target.value;
                                                this.updateZip(zip, { value: value }, filteredKey)
                                            }} value={zip.value} />
                                        </td>
                                        <td>
                                            <input type="number" onChange={(e) => {
                                                const price = e.target.value;
                                                this.updateZip(zip, { price: price }, filteredKey)
                                            }} value={zip.price} />
                                        </td>
                                        <td>
                                            <input type="text" onChange={(e) => {
                                                const city = e.target.value;
                                                this.updateZip(zip, { city: city }, filteredKey)
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