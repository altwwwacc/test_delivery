import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import _isEqual from 'lodash/isEqual'
import {getPorts, getRates} from "./../redux/actions/graphic";
import GraphicHeader from "./GraphicHeader/GraphicHeader";
import GraphicView from "./GraphicView/GraphicView";

import './Graphic.scss';

const getTime = (dateString) => {
    return new Date(dateString).getTime()
};

class Graphic extends Component {

    state = {
        // endDate: null,
        // startDate: null,
        // origin: null,
        // destination: null,
        startDate: new Date('2021-01-01'),
        endDate: new Date('2022-01-03'),
        origin: 'CNSGH',
        destination: 'NLRTM',
        ratesData: null,
        graphicRef: null,
    };

    getRatesData = (props) => {
        const localProps = props || this.props;
        const startDateTime = getTime(this.state.startDate);
        const endDateTime = getTime(this.state.endDate);

        const ratesData = localProps.rates.filter(item => {
            const itemTime = getTime(item.day);
            return startDateTime <= itemTime && itemTime <= endDateTime
        });
        console.log('componentWillReceiveProps');
        console.log(localProps.rates);

        this.setState({
            ratesData
        });
    };
    componentWillReceiveProps(nextProps) {

        if(!_isEqual(nextProps.rates, this.props.rates)) {
            this.getRatesData(nextProps);
        }
        // if(nextProps.ports && this.state.ratesData === null) {
        //     // this.getGraphicData();
        //     this.getRatesData(nextProps);
        // }
    }
    componentDidMount() {
        // загрузить данные
        this.props.getPorts();
        this.getGraphicData();
    }

    getGraphicData = () => {
        const { startDate, endDate, origin, destination } = this.state;

        // console.log(origin, destination);
        this.props.getRates({origin, destination});

    };

    handleDateChange = (date) => {
        console.log(date);
        this.setState({
            ...date,
        }, this.getRatesData)
    };

    handleDestinationChange = (data) => {
        this.setState({
            ...data
        },this.getGraphicData)
    };

    setRef = (graphicRef) => {
        this.setState({
            graphicRef
        })
    };

    handleDownloadGraphic = () => {
        function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
            return(Math.min((maxW/imgW),(maxH/imgH)));
        }

        const { graphicRef } = this.state;
        // var svg = document.querySelector('svg');
        var svg = graphicRef.getElementsByTagName('svg')[0];
        function triggerDownload (imgURI) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true
            });

            var a = document.createElement('a');
            a.setAttribute('download', 'graphick.png');
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');

            a.dispatchEvent(evt);
        }
        var canvas = document.createElement('canvas');
        // var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var data = (new XMLSerializer()).serializeToString(svg);
        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svgBlob);

        img.onload = function () {
            canvas.width = graphicRef.offsetWidth;
            canvas.height = graphicRef.offsetHeight;

            var w = img.width;
            var h = img.height;

            // resize img to fit in the canvas
            var sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

            DOMURL.revokeObjectURL(url);

            var imgURI = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');


            triggerDownload(imgURI);
        };

        img.src = url
    };
    render() {
        const { endDate, startDate, ratesData, destination, origin} = this.state;
        return (
            <div className="Graphic">
                <div className="Graphic__header">
                    <GraphicHeader
                        endDate={endDate}
                        startDate={startDate}
                        onDateChange={this.handleDateChange}
                        onDestinationChange={this.handleDestinationChange}
                        origin={origin}
                        destination={destination}
                        onDownloadGraphic={this.handleDownloadGraphic}
                    />
                </div>
                <GraphicView ratesData={ratesData} setRef={this.setRef}/>
            </div>
        );
    }
}

const mapStateToProps = ({graphic,...state}) => ({
    rates: graphic.rates,
    ports: graphic.ports
});

const mapDispatchToProps = {
    getPorts,
    getRates,
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Graphic));
export default connect(mapStateToProps, mapDispatchToProps)(Graphic);