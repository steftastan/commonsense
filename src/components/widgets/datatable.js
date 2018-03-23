/**
 * DATA TABLE WIDGET
 *
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import React, { Component } from 'react';
import $ from 'jquery';
import './../../global.languages.js';
import './../../global.config.env.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Localization, DataFormatter} from './../../global.helpers.js';
import { Filter } from './../../components/widgets/filter.js';
import Moment from 'moment';

export class DataTable extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.DataFormatter = DataFormatter;
      this.pagination = 'pagination';
      this.tableData = [];
      this.dataColumns = [];
      this.options = {};
      this.filters = [];
      this.tags;
      this.newPaginationClass = 'dataTable__pagination';
      this.state = {
          all: false,
          filters: [],
          updated: false
      };
    }

    componentWillMount() {
        var submit__text = this.Localization('submit', this.props.language);
        this.tableData = this.props.results;
        this.options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
            text: '10', value: 10
            }, {
            text: '25', value: 25
            }, {
            text: '50', value: 50
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: this.Localization('prev', this.props.language), // Previous page button text
            nextPage: this.Localization('next', this.props.language), // Next page button text
            firstPage: this.Localization('first', this.props.language), // First page button text
            lastPage: this.Localization('last', this.props.language), // Last page button text
            paginationShowsTotal: true,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
        };

        /**
         * Replace the default values in the options variable if custom
         * data was sent from the page.
         */
        if (this.props.options && this.props.options.options) {

            for (var key in this.options) {
                /* Override all the default values */
                if (this.props.options.options.hasOwnProperty(key)) {
                    this.options[key] = this.props.options.options[key];
                }

                /* TODO over write tableData maybe in component will mount depending if there are filters up in the URL... so bring in all data Android
                filter results over here */

                /* Append "All" option as another default item in pagination count. */
                if (key === 'sizePerPageList' && this.state.all === false) {
                    this.options.sizePerPageList[this.options.sizePerPageList.length] = {
                        text: this.Localization('all', this.props.language), value: this.tableData.length
                    };
                }
            }
        }

    }

    componentDidMount() {
        var pagination = document.getElementsByClassName(this.pagination);
        var tableContainer;

        /* Allows the submitted search to vary if the user manually changes the parametes in the URL */
        if (!window.location.href.includes(this.currentWeek) && /[?&]q=/.test(window.location.search)) {
            this.currentWeek = window.location.search;
        }

        /**
         * We must adjust the positioning of our pagination element post-mount, unfortunately
         * this cannot be customized with the current version of React BootStrap Table (version 4.0)
         */
         for (var i = 0; i < pagination.length; i++) {
             if (pagination[i].nodeName === 'UL') {
                 $(pagination[i].parentNode).addClass(this.newPaginationClass);
                 tableContainer = $(pagination[i].parentNode).closest('.react-bs-table-container');
                 $(pagination[i].parentNode).detach().appendTo(tableContainer.first('.dataTable__pagination'));
             }
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
            this.tableData = this.props.results;
        }

        // console.log('omg');
        if (this.props.search) {
            this.tableData = this.props.results;
        }
    }

    render() {
        var tableHeaders;
        var align;
        var filterBy;
        var title__text;
        var id;
        var columnName;
        var columnName__text;
        var columnType;
        var columnWidth;

        console.log(this.props);
        if (this.tableData && this.tableData.length) {

            /**
             * Build the table's columns
             * We can pass the custom columns we want to use with the customColumn property from the config.
             * The fallback behavior is to display all columns.
             */
            if (this.props.options) {

                if (!this.props.options.filters || !this.props.search) {
                    /* If the configuration object doesn't specify multiple endpoints, or if no parameters are on the URL */
                    this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                } else {
                    for (var i = 0; i < this.props.options.filters.length; i++) {

                        /* In case of dropdown */
                        if (this.props.options.filters[i].group instanceof Array && this.props.options.filters[i].group.length) {
                            for (var j = 0; j < this.props.options.filters[i].group.length; j++) {
                                if (this.props.options.filters[i].group[j] && this.props.options.filters[i].group[j].customColumns) {

                                    /* Build data table with the custom columns for the selected filter */
                                    if (this.props.search.indexOf(this.props.options.filters[i].group[j].params) !== -1) {
                                        this.dataColumns = this.props.options.filters[i].group[j].customColumns;
                                        break;
                                    } else {
                                        /* The query string doesn't match anything in the config, render default columns to prevent errors */
                                        this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                                    }
                                }
                            }
                        } else {
                            /* For all others where filters are not multiple choice, and custom columns are not applicable */
                            this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                        }

                    }
                }

                if (this.dataColumns.length) {
                    tableHeaders = this.dataColumns.map(function(item, key) {
                        filterBy = (this.dataColumns && (this.dataColumns.indexOf(item) !== -1)) ? { type: 'TextFilter' } : {};
                        columnName = item.name || item;
                        columnType = item.type || '';
                        id = (item.type === 'id' ? item : {});
                        columnWidth = ''+item.width+'' || 50; // Column width, or defaults to 50, whatever that means.
                        columnName__text = this.Localization(columnName, this.props.language); // Translated version of the column name.
                        align = (item.align || 'left'); // Align contents to whatever specified or fall back to left-alignment

                        return (
                            <TableHeaderColumn
                                key={key}
                                width={columnWidth}
                                isKey={key === 0 ? true : false}
                                dataAlign={align}
                                dataFormat={this.DataFormatter}
                                formatExtraData={columnType}
                                filter={filterBy}
                                dataSort={true}
                                dataField={columnName}>
                                    {columnName__text}
                            </TableHeaderColumn>
                        );
                    }, this);
                }
            }
        }

        if (this.tableData && this.dataColumns) {
            /*Translated version of title*/
            title__text = this.Localization(this.props.options.title, this.props.language);

            var table = (
                <div className="wrapper wrapper__content--whiteBox">
                    <h2 className={'dataTable__title'}>{title__text}</h2>
                    <Filter filters={this.props.filters} id={this.props.index} filterHandler={this.props.filterHandler} defaultParams={this.props.options.defaultParams} />
                    <BootstrapTable key={this.props.index} data={this.tableData} options={this.options} striped hover pagination tableHeaderClass={'dataTable__row--header'} trClassName={'dataTable__row--content'}>
                        {tableHeaders}
                    </BootstrapTable>
                    <div className="dataTable__pagination"></div>
                </div>
            );
        }

        return (
            <div key={this.props.index} id={this.props.index} className={this.props.options.bootStrapClass}>
                {table}
            </div>

        );
    }
}

export default DataTable;
