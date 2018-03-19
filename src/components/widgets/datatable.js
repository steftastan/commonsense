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
import Moment from 'moment';

export class DataTable extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.DataFormatter = DataFormatter;
      this.buildQueryString = this.buildQueryString.bind(this);
      this.filterTable = this.filterTable.bind(this);
      this.pagination = 'pagination';
      this.currentWeek = '&year='+Moment().year()+'&week='+Moment().week();
      this.tableData = [];
      this.dataColumns = [];
      this.options = {};
      this.filters = [];
      this.queryArray = [];
      this.queryString = '';
      this.dateAdded = false;
      this.tags;
      this.newPaginationClass = 'dataTable__pagination';
      this.state = {
          all: false,
          filters: []
      };
    }

    buildQueryString(e) {
        e.preventDefault();
        var removeIndex;

        /* Remove highlighted effect when user begins to pick different search criteria */
        if (this.tags && this.tags.length) {
            for (var key = 0; key < this.tags.length; key++) {
                if (this.tags[key].classList.contains('tag--highlighted')) {
                    this.tags[key].classList.remove('tag--highlighted');
                }
            }
        }

        /* Append year and week parameters to query array  */
        if (!this.dateAdded) {
            this.queryArray.push(this.currentWeek);
            this.dateAdded = true;
        }

        if (!e.target.classList.contains('tag--active')) {

            /* Add selected criteria to array, toggle on the corresponding element */
            this.queryArray.push(e.target.getAttribute('href'));
            e.target.classList.add('tag--active');

        } else {

            /* Remove the selected filter from the array, toggle off the corresponding element */
            if (this.queryArray.indexOf(e.target.getAttribute('href')) !== -1) {
                removeIndex =this.queryArray.indexOf(e.target.getAttribute('href'));
                this.queryArray.splice(removeIndex);
                e.target.classList.remove('tag--active');
            }
        }

        /* Build the query string */
        if (this.queryArray.length) {
            this.queryString = this.queryArray.join('&');
        }
    }

    filterTable(e) {
        e.preventDefault();
        window.location.href = '?'+this.queryString;
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

        if (this.props.filters) {

            /* Build filter options*/
            for (var i = 0; i < this.props.filters.length; i++) {
                this.filters.push(<a key={i} href={this.props.filters[i].params} className="tag" onClick={this.buildQueryString}>{this.props.filters[i].displayName}</a>);
            }

            /* Submit button */
            if (this.filters.length) {
                this.filters.push(<a key={key} className="tag tag--submit" onClick={this.filterTable}>{submit__text}</a>);
            }

            this.setState({
                all: true,
                filters: this.filters
            });
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

         /* Highlight the filters that were selected after page load */
         this.tags = document.getElementsByClassName('tag');

         for (var key = 0; key < this.tags.length; key++) {
             var activeTags =  this.tags[key] ? this.tags[key].getAttribute("href") : '';
             if (window.location.href.includes(activeTags)) {
                 this.tags[key].classList.add('tag--highlighted');
             }
         }

    }

    render() {
        var tableHeaders;
        var align;
        var filterBy;
        var title__text;
        var columnName;
        var columnName__text;
        var columnType;
        var columnWidth;

        if (this.tableData && this.tableData.length) {

            /**
             * Build the table's columns
             * We can pass the custom columns we want to use with the customColumn property from the config.
             * The fallback behavior is to display all columns.
             */
            if (this.props.options) {
                if (!this.props.options.filters) {
                    /* If the configuration object doesn't specify multiple endpoints, fall back to the columns specified under defaultColumns */
                    this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                } else {
                    for (var i = 0; i < this.props.options.filters.length; i++) {

                        /* In case of multiple endpoints, find the configuration that matches the query string passed via the URL */
                        if (this.dataColumns && (this.props.search.indexOf(this.props.options.filters[i].params) !== -1) && this.props.options.filters[i].customColumns) {
                            this.dataColumns = this.props.options.filters[i].customColumns;
                            break;
                        } else {
                            /* If something weird happen fall back to the original behavior, and if something even weirder happens, just render everything. */
                            this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                        }
                    }
                }

                /* TODO: */
                if (this.dataColumns.length) {
                    tableHeaders = this.dataColumns.map(function(item, key) {
                        filterBy = (this.dataColumns && (this.dataColumns.indexOf(item) !== -1)) ? { type: 'TextFilter' } : {};
                        columnName = item.name || item;
                        columnType = item.type || '';
                        columnWidth = ''+item.width+'' || 50;
                        columnName__text = this.Localization(columnName, this.props.language); // Translated version of the column name.
                        align = (item.type && item.type === 'currency') ? 'right' : 'left'; // Align contents to the right when the column is formatted as currency.

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
                    <div className="tag__wrapper col-lg-6">
                        {this.filters}
                    </div>
                    <BootstrapTable key={this.props.index} data={this.tableData} options={this.options} striped hover pagination tableHeaderClass={'dataTable__row--header'} trClassName={'dataTable__row--content'}>
                        {tableHeaders}
                    </BootstrapTable>
                    <div className="dataTable__pagination"></div>
                </div>
            );
        }

        return (
            <div key={this.props.index} className={this.props.options.bootStrapClass}>
                {table}
            </div>

        );
    }
}
