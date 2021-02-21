import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './GraphicHeader.scss';
import PortsSelect from "./../GraphicHeader/PortsSelect";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

const GraphicHeader = ({endDate = null, startDate = null, onDateChange, onDestinationChange, ...props }) => {

    const [origin, setOrigin ] = useState(props.origin);
    const [destination, setDestination ] = useState(props.destination);

    const handleDate = (type) => (date) => {
        onDateChange({
            endDate,
            startDate,
            [type]: date
        })
    };

    useEffect(() => {
        onDestinationChange({origin,destination})
    }, [origin,destination]);

    return (
        <div className="GraphicHeader">
            <div className="GraphicHeader__options">
                <div className="GraphicHeader__item GraphicHeader__item--destination">
                    <TrackChangesIcon className="TrackChangesIcon"/>
                    <div>
                        <PortsSelect
                            value={origin}
                            onChange={setOrigin}
                        />
                        <PortsSelect
                            value={destination}
                            onChange={setDestination}
                        />
                    </div>
                </div>
                <div className="GraphicHeader__item GraphicHeader__item--date">
                    <DatePicker selected={startDate} onChange={handleDate('startDate')} popperPlacement="top-start" />
                    <ArrowForwardIcon className="ArrowForwardIcon"/>
                    <DatePicker selected={endDate} onChange={handleDate('endDate')} popperPlacement="top-end"/>
                </div>
            </div>
            <button onClick={props.onDownloadGraphic}>
                Download
            </button>


        </div>
    )
};

export default GraphicHeader;