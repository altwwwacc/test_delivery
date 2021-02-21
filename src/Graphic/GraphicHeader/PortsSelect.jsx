import React from 'react';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {getPorts, getRates} from "../../redux/actions/graphic";
import {connect} from "react-redux";


const PortsSelect = ({value, onChange, ports = []}) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            className="PortsSelect"
        >
            {ports.map(port => (
                <MenuItem value={port.code} key={`port-${port.code}`}>{port.name}</MenuItem>
            ))}
        </Select>
    )
};



const mapStateToProps = ({graphic, ...state}) => ({
    ports: graphic.ports
    // itemsManagement: content.itemsManagement,
    // isLoadingItemsManagement: content.isLoadingItemsManagement,
});

const mapDispatchToProps = {
    getPorts,
    getRates,
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Graphic));
export default connect(mapStateToProps, mapDispatchToProps)(PortsSelect);