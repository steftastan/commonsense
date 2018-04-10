/*
 * React-Chartjs2 found here:
 * https://github.com/houjiazong/react-chartjs2
 */

import React, { Component } from 'react';
import './../../global.config.env.js';
import { Localization, ConvertRgbToRgba, DataFormatter } from './../../global.helpers.js';
import { Filter } from './../../components/widgets/Filter.js';
import { DataTable } from './../../components/widgets/DataTable.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RC2 from 'react-chartjs2';

export class DataChart extends Component {

    constructor(props) {
        super(props);
        this.Localization = Localization;
        this.ConvertRgbToRgba = ConvertRgbToRgba;
        this.DataFormatter = DataFormatter;
        this.processData = this.processData.bind(this);
        this.buildTable = this.buildTable.bind(this);
        this.buildChart = this.buildChart.bind(this);
        this.buildChartDetails = this.buildChartDetails.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.add = this.add.bind(this);
        this.colors = global.colors;
        this.myChart = null;
        this.groupBy = '';
        this.calculateBy = '';
        this.chartType = '';
        this.labels = [];
        this.data = {};
        this.chartDataArray = [];
        this.tableData = [];
        this.chartData = [];
        this.tableHeaders = [];
        this.tableRows = [];
        this.renderTable = [];
        this.renderChartInfo = [];
        this.state = {
            all: false,
            filters: [],
            updated: false
        };
    }

    /*
     * Build data to in the statistics chart.
     * Reference to this solution:
     * https://stackoverflow.com/questions/21874436/summarize-and-group-json-object-in-jquery
    **/
    processData() {

        var groupBy = this.props.options.groupBy.name;
        var calculateBy = this.props.options.calculateBy.name;

        var output = {};
        var parseNumber = 0;
        // var index = 0;

        if (this.props.results && groupBy && calculateBy) {
            try {
                output = this.props.results.reduce(function(out, curr, index) {

                    parseNumber = (!isNaN(curr[calculateBy]) ? Math.floor(curr[calculateBy]) : Math.floor(parseInt(curr[calculateBy].replace(/\s/g, "").replace(",", ""))));

                    out.dataset[curr[groupBy]] = out.dataset[curr[groupBy]] || {};
                    out.dataset[curr[groupBy]][groupBy] = curr[groupBy] || {};
                    out.dataset[curr[groupBy]][calculateBy] = (out.dataset[curr[groupBy]][calculateBy] || 0) + parseNumber;

                    out.total['total'] = (out.total['total'] || 0) + parseNumber;

                    // index++;
                    return out;

                }, {'dataset' : {}, 'total':{}});
            } catch (e) {
                /* The operation fails if:
                 *
                 * The data returned from the web service doesn't have columns that match the names
                 * provided in the groupBy and calculateBy properties.
                 * To fix, double check the data received from the WS, or modify the values
                 * for groupBy and calculateBy in global.pages.js for that page's configuration.
                **/
                console.log('An error ocurred while generating the data chart.');
            }

        }

        return output;
    }

    /* Build data table **/
    buildTable() {
        var dataTableArray = [];
        var tableHeaders = [];
        var sortedDataset = [];
        var columnType = '';

        this.renderTable = (<DataTable
            index={this.props.index}
            key={this.props.index}
            active={this.props.active}
            options={this.props.options}
            results={this.props.results}
            search={this.props.search}
            dbFilters={this.props.dbFilters || []}
            language={this.props.language} />);

    }

    /* This function is used to add up and merge the values
     * that fall under the Other category
    **/
    add(a, b) {
        var calculateBy = this.props.options.calculateBy.name;
        return a + b[calculateBy];
    }

    buildChart(index) {
        var groupBy = this.props.options.groupBy.name;
        var calculateBy = this.props.options.calculateBy.name;
        var chartLabel = this.Localization(this.props.options.label, this.props.language) || '';
        var backgroundColor = [];
        var borderColor = [];
        var sortedDataset = this.chartData.dataset.sort(function(a, b) {return (a[calculateBy] < b[calculateBy]) ? 1 : ((b[calculateBy] < a[calculateBy]) ? -1 : 0);});
        var topElems = [];
        var otherElems = [];
        var otherSum = [];
        this.chartType = this.props.options.type || 'pie';

        if (this.props.options.filters && this.props.options.filters.length) {
            for (var i = 0; i < this.props.options.filters.length; i++) {

                /* Checks the filter type, if group is an Array it is a dropdown menu */
                if (this.props.options.filters[i].group instanceof Array && this.props.options.filters[i].group.length) {

                    for (var j = 0; j < this.props.options.filters[i].group.length; j++) {
                        if (this.props.search.indexOf(this.props.options.filters[i].group[j].params) !== -1) {

                            /* Display the correct custom column set depending on user criteria */
                            if (this.props.options.filters[i].group[j].customChart) {
                                this.chartType = this.props.options.filters[i].group[j].customChart.type;
                                groupBy = this.props.options.filters[i].group[j].customChart.groupBy;
                                calculateBy = this.props.options.filters[i].group[j].customChart.calculateBy;
                            }

                            break;
                        }
                    }
                }
            }
        }

        /* Split the data into Top Elements and Others if neccessary */
        if (sortedDataset.length > this.props.options.topElems) {
            topElems = sortedDataset.slice(0, (this.props.options.topElems || 5)); // Get the top 5 according to the calculateBy field
            otherElems = sortedDataset.slice((this.props.options.topElems || 5)); // Get the remaining elements
            otherSum = otherElems.reduce(this.add, 0); // Merge all other items together
        } else {
            topElems = sortedDataset;
        }

        /* Make labels for the top elements */
        for (var i = 0; i < topElems.length; i++) {
            this.labels.push(topElems[i][groupBy]);
            this.chartDataArray.push(topElems[i][calculateBy]);
        }

        /* Create an "other" label for all non-top elements */
        if (otherElems.length) {
            this.labels.push(this.Localization('others', this.props.language));
            this.chartDataArray.push(otherSum);
        }

        /* Add cosmetic details */
        if (this.labels.length) {
            for (var i = 0; i < this.labels.length; i++) {
                borderColor.push(this.colors[i]);
                backgroundColor.push(this.ConvertRgbToRgba(this.colors[i], 0.2));
            }
        }

        /* Push to config object */
        this.data = {
            labels: this.labels,
            type: this.chartType,
            datasets: [{
                label: chartLabel,
                data: this.chartDataArray,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        };

        this.chartDataArray = [];
        this.labels = [];
    }

    /** Helps us render formatted cells that could have additional HTML formatting */
    createMarkup(cell) {
        return {__html: cell };
    }

    buildChartDetails() {
        var total;
        var formatType;
        var formatData;
        var formattedCell;

        this.tableRows = this.chartData.dataset.map(function(item, key) {
            /* Obtain percentage */
            total = (item[this.props.options.calculateBy.name] / this.chartData.total.total * 100);

            /* Format the cells in the small table. */
            formatData = item[this.props.options.calculateBy.name];
            formatType = this.props.options.calculateBy.type;
            formattedCell = this.DataFormatter(formatData, null, formatType);

            return (
                <tr className="dataChart__row" key={key}>
                    <td className="dataChart__cell">{item[this.props.options.groupBy.name]}</td>
                    <td className="dataChart__cell" dangerouslySetInnerHTML={this.createMarkup(formattedCell)}></td>
                    <td className="dataChart__cell">{total.toFixed(2)}%</td>
                </tr>
            );
        }, this);

        this.renderChartInfo = (
            <div key={this.props.index} className="col-12">
                <table key={this.props.index} className="dataChart__table">
                    <thead className="dataChart__heading">
                        <tr>
                            <th className="dataChart__cell--heading">{this.props.options.groupBy.name}</th>
                            <th className="dataChart__cell--heading">{this.props.options.calculateBy.name}</th>
                            <th className="dataChart__cell--heading">%</th>
                        </tr>
                    </thead>
                    <tbody className="dataChart__tableBody">
                        {this.tableRows}
                    </tbody>
                </table>
            </div>
        );
    }

    /*
     * Build data object for the chart.
     */
    componentWillMount() {
        this.tableData = this.props.results;  // The table data as it's returned from the database.
        var dataObject = this.processData(); // The table data after being grouped.
        var dataArray = [];

        for (var key in dataObject.dataset) {
            if (!dataObject.dataset.hasOwnProperty(key)) continue;
            var obj = dataObject.dataset[key];
            dataArray.push(obj);
        }

        dataObject.dataset = dataArray;
        this.chartData = dataObject;

        this.buildChart();
        if (this.props.options.buildTable) this.buildTable();
        if (this.props.options.showChartDetails) this.buildChartDetails();

    }

    componentDidUpdate(prevProps, prevState) {
        var data = {};
        var result = {};
        var filters;

        /**
        * Begin the process of loading widgets after the component has finished mounting.
        */
        if (prevProps.results !== this.props.results) {
            this.setState({ updated: true });
            var dataObject = this.processData(); // The table data after being grouped.
            var dataArray = [];

            for (var key in dataObject.dataset) {
                if (!dataObject.dataset.hasOwnProperty(key)) continue;
                var obj = dataObject.dataset[key];
                dataArray.push(obj);
            }

            dataObject.dataset = dataArray;
            this.chartData = dataObject;

            this.tableData = this.props.results;
            this.buildChart(this.props.index);
            if (this.props.options.buildTable) this.buildTable();
            if (this.props.options.showChartDetails) this.buildChartDetails();
        }
    }

    render() {
        var title__text = this.Localization(this.props.options.title, this.props.language);
        var chartWidthClass = 'col-lg-8 col-sm-12';
        var tableWidthClass = 'col-lg-4 col-sm-12 mb-15';
        var chartInfo;

        if (this.props.options.showChartDetails) {
            chartInfo = (<div className={tableWidthClass}>{this.renderChartInfo}</div>);
        } else {
             chartWidthClass = 'col-12';
        }

        return (
            <div key={this.props.theKey} id={this.props.index} className={this.props.options.bootStrapClass}>
                <div className="wrapper wrapper__content--whiteBox">
                    <h2 className={'dataTable__title'}>{title__text}</h2>
                    <Filter filters={this.props.options.filters} dbFilters={this.props.dbFilters || []} id={this.props.index} filterHandler={this.props.filterHandler} defaultParams={this.props.options.defaultParams} language={this.props.language} />
                    <div className={chartWidthClass}>
                        <RC2 data={this.data} type={this.chartType} />
                    </div>
                    {chartInfo}
                    {this.renderTable}
                </div>
            </div>
        );
    }
}

export default DataChart;
