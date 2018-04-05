/**
 * DATA TABLE WIDGET
 *
 * Data table created with React Bootstrap Table by Allen Fang
 * http://allenfang.github.io/react-bootstrap-table
 */

import './../../global.polyfills.js';
import React, { Component } from 'react';
import $ from 'jquery';
import './../../global.config.env.js';
import './../../global.languages.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Localization, DataFormatter} from './../../global.helpers.js';
import { Filter } from './../../components/widgets/Filter.js';
export class DataTable extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.DataFormatter = DataFormatter;
      this.renderTable = this.renderTable.bind(this);
      this.pagination = 'pagination';
      this.tableHeaders = {};
      this.table = {};
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

    renderTable(index) {
        var title__text;
        var columnName__text;
        var align;
        var filterBy;
        var columnName;
        var columnType;
        var columnWidth;
        var id;

        /**
         * Build the table's columns
         * We can pass the custom columns we want to use with the customColumn property from the config.
         * The fallback behavior is to display all columns.
        **/

        if (!index) {
            /* First time rendering table*/
            this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
        } else {

            for (var i = 0; i < this.props.options.filters.length; i++) {

                /* Checks the filter type, if group is an Array it is a dropdown menu */
                if (this.props.options.filters[i].group instanceof Array && this.props.options.filters[i].group.length) {

                    for (var j = 0; j < this.props.options.filters[i].group.length; j++) {
                        if (this.props.search.indexOf(this.props.options.filters[i].group[j].params) !== -1) {
                            /* Display the correct custom column set depending on user criteria */
                            if (this.props.options.filters[i].group[j].customColumns) this.dataColumns = this.props.options.filters[i].group[j].customColumns;
                            break;
                        }
                    }
                }

                else {
                    /* For all others where filters are not multiple choice, and custom columns are not applicable */
                    this.dataColumns = (this.props.options.defaultColumns ? this.props.options.defaultColumns : Object.keys(this.tableData[0]));
                }
            }

        }

        /* Build table with all the data we acquired */
        if (this.dataColumns.length) {
            this.tableHeaders = this.dataColumns.map(function(item, key) {
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

        if (this.tableData && this.dataColumns) {
            /*Translated version of title*/
            title__text = this.Localization(this.props.options.title, this.props.language);
            var dataTableTitle = (this.props.options.hideTitleInTable ? '' : (<h2 className='dataTable__title'>{title__text}</h2>));

            this.table = (
                <div className={this.props.options.tableWrapperClass || "wrapper wrapper__content--whiteBox"}>
                    {dataTableTitle}
                    <Filter filters={this.props.filters} dbFilters={this.props.dbFilters || []} id={this.props.index} filterHandler={this.props.filterHandler} defaultParams={this.props.options.defaultParams} />
                    <BootstrapTable key={this.props.index} data={this.tableData} options={this.options} striped hover pagination tableHeaderClass={'dataTable__row--header'} trClassName={'dataTable__row--content'}>
                        {this.tableHeaders}
                    </BootstrapTable>
                    <div className="dataTable__pagination"></div>
                </div>
            );
        }
    }

    componentWillMount() {
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

        /* Render table first time around */
        if (this.tableData && this.tableData.length) this.renderTable();

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

        /* Allows the submitted search to vary if the user manually changes the parameters in the URL */
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
        /**
        * Begin the process of loading widgets after the component has finished mounting.
        */

        if (prevProps.results !== this.props.results) {
            this.tableData = this.props.results;
            this.renderTable(this.props.index);
            this.setState({ updated: true });
        }
    }

    render() {
        var bootstrapClass = (this.props.options.overrideBootStrapClass ? this.props.options.overrideBootStrapClass : this.props.options.bootStrapClass);
        return (
            <div key={this.props.index} id={this.props.index} className={bootstrapClass}>
                {this.table}
            </div>
        );
    }
}

export default DataTable;
