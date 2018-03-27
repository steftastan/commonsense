/*
 * React-Chartjs2 found here:
 * https://github.com/houjiazong/react-chartjs2
 */

import React, { Component } from 'react';
import './../../global.config.env.js';
import { Localization, ConvertRgbToRgba, DataFormatter } from './../../global.helpers.js';
import { Filter } from './../../components/widgets/Filter.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RC2 from 'react-chartjs2';

export class DataChart extends Component {

    constructor(props) {
        super(props);
        this.Localization = Localization;
        this.ConvertRgbToRgba = ConvertRgbToRgba;
        this.DataFormatter = DataFormatter;
        this.colors = global.colors;
        this.processData = this.processData.bind(this);
        this.buildTable = this.buildTable.bind(this);
        this.buildChart = this.buildChart.bind(this);
        this.add = this.add.bind(this);
        this.renderTable = [];
        this.myChart = null;
        this.data = {};
        this.chartDataArray = [];
        this.tableHeaders = [];
        this.tableRows = [];
        this.state = {
            all: false,
            filters: [],
            updated: false
        };
    }

    /*
     * Build data to in the statistics chart.
     * Reference to this solution:
     *https://stackoverflow.com/questions/21874436/summarize-and-group-json-object-in-jquery
    **/
    processData() {
        var groupBy = this.props.options.groupBy;
        var calculateBy = this.props.options.calculateBy;

        var output = {};
        var parseNumber = 0;
        var index = 0;

        if (this.props.results && groupBy && calculateBy) {
            try {
                output = this.props.results.reduce(function(out, curr) {

                    parseNumber = (!isNaN(curr[calculateBy]) ? Math.floor(curr[calculateBy]) : Math.floor(parseInt(curr[calculateBy].replace(/\s/g, "").replace(",", ""))));
                    out.dataset[index] = out.dataset[curr[groupBy]] || {};
                    out.dataset[index][groupBy] = curr[groupBy] || {};
                    out.dataset[index][calculateBy] = (out.dataset[index][calculateBy] || 0) + parseNumber;
                    out.total['total'] = (out.total['total'] || 0) + parseNumber;

                    index++;
                    return out;

                }, {'dataset' : [], 'total':{}});
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
    buildTable(chartData) {
        var index = 0;
        var dataTableArray = [];
        var tableHeaders = [];
        var sortedDataset = [];
        var columnType = '';
        var calculateBy = this.props.options.calculateBy;
        var formatTableData = this.props.options.formatTableData;

        for(var i = 0; i < 1; i++) {

            for(var key in chartData.dataset[i]) {

                if (key === formatTableData.name) {
                    columnType = formatTableData.type;
                }

                this.tableHeaders.push(
                    <TableHeaderColumn
                    key={index}
                    width={'50'}
                    isKey={index === 0 ? true : false}
                    dataFormat={this.DataFormatter}
                    formatExtraData={columnType}
                    dataSort={true}
                    dataField={key}>
                        {this.Localization(key, this.props.language)}
                    </TableHeaderColumn>);
                index++;
            }
        }

        this.renderTable = (
            <BootstrapTable
                key={i}
                data={chartData.dataset}
                striped hover
                tableHeaderClass={'dataTable__row--header'}
                bodyContainerClass='dataTable__body--fixedHeight'
                trClassName={'dataTable__row--content'}>
                    {this.tableHeaders}
            </BootstrapTable>);
    }

    /* This function is used to add up and merge the values
     * that fall under the Other category
    **/
    add(a, b) {
        var calculateBy = this.props.options.calculateBy;
        return a + b[calculateBy];
    }

    buildChart(chartData) {

        var type = this.props.options.type || 'pie'; //Default to pie chart if no type was specified.
        var groupBy = this.props.options.groupBy;
        var calculateBy = this.props.options.calculateBy;
        var chartLabel = this.Localization(this.props.options.label, this.props.language) || '';
        var labels = [];
        var backgroundColor = [];
        var borderColor = [];
        var sortedDataset = chartData.dataset.sort(function(a, b) {return (a[calculateBy] < b[calculateBy]) ? 1 : ((b[calculateBy] < a[calculateBy]) ? -1 : 0);});
        var topElems = [];
        var otherElems = [];

        /* Split the data into Top Elements and Others if neccessary */
        if (sortedDataset.length > this.props.options.topElems) {
            topElems = sortedDataset.slice(0, (this.props.options.topElems || 5)); // Get the top 5 according to the calculateBy field
            otherElems = sortedDataset.slice((this.props.options.topElems || 5)); // Get the remaining elements
            var otherSum = otherElems.reduce(this.add, 0); // Merge all other items together
        } else {
            topElems = sortedDataset;
        }

        /* Make labels for the top elements */
        for (var i = 0; i < topElems.length; i++) {
            labels.push(topElems[i][groupBy]);
            this.chartDataArray.push(topElems[i][calculateBy]);
        }

        /* Create an "other" label for all non-top elements */
        if (otherElems.length) {
            labels.push(this.Localization('others', this.props.language));
            this.chartDataArray.push(otherSum);
        }

        /* Add cosmetic details */
        if (labels.length) {
            for (var i = 0; i < labels.length; i++) {
                borderColor.push(this.colors[i]);
                backgroundColor.push(this.ConvertRgbToRgba(this.colors[i], 0.2));
            }
        }


        /* Push to config object */
        this.data = {
            labels: labels,
            type: type,
            datasets: [{
                label: chartLabel,
                data: this.chartDataArray,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        };
    }

    /*
     * Build data object for the chart.
     */
    componentWillMount() {
        var buildTable = this.props.options.buildTable;
        var chartData = this.processData(); // The new object with the group data.

        if (chartData && chartData.dataset) {
            this.buildChart(chartData);
            if (buildTable) this.buildTable(chartData);
        }
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
            this.rawData = this.props.results;
        }
    }

    render() {
        var title__text = this.Localization(this.props.options.title, this.props.language);
        var bootStrapClass = this.props.options.buildTable ? 'col-lg-6' : 'col-12';

        return (
            <div key={this.props.theKey} className={this.props.options.bootStrapClass}>
                <div className="wrapper wrapper__content--whiteBox">
                    <h2 className={'dataTable__title'}>{title__text}</h2>
                    <Filter filters={this.props.options.filters} dbFilters={this.props.dbFilters || []} id={this.props.index} filterHandler={this.props.filterHandler} defaultParams={this.props.options.defaultParams} />
                    <div className={bootStrapClass}>
                        <RC2 data={this.data} type={this.props.options.type || 'pie'} />
                    </div>
                    {this.renderTable}
                </div>
            </div>
        );
    }
}

export default DataChart;
