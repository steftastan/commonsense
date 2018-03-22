/* TODO: Move the filter from Data table to here, filters should be accessible for all other widgets */

import React, { Component } from 'react';
import { Localization } from './../../global.helpers.js';
import Moment from 'moment';
import $ from 'jquery';

export class Filter extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.filterTable = this.filterTable.bind(this);
      this.currentWeek = '&year='+Moment().year()+'&week='+Moment().week();
      this.companyList = [];
      this.filter = [];
      this.submitButton = [];
      this.queryArray = [];
      this.queryString = '';
      this.state = {
          query: ''
      },
      this.dateAdded = false;
      this.defaultParamsAdded = false;
    }


    filterTable(e) {
        e.preventDefault();
        var params = [];

        /* Append defaultParams (query string params applicable to all searches) if available  */
        if (!this.defaultParamsAdded && this.props.defaultParams) {
            this.queryArray.push(this.props.defaultParams);
            this.defaultParamsAdded = true;
        }

        $('#filter--'+this.props.id+' .filter').each(function() {
            if ($(this).attr("name")) {
                params.push($(this).attr("name")+'='+$(this).val());
            } else {
                params.push($(this).val());
            }
        });

         this.queryArray = this.queryArray.concat(params);

        /* Build the query string */
        if (this.queryArray.length) {
            this.queryString = this.queryArray.join('&');
            this.queryArray = [];

            console.log(this.props);
            this.props.filterHandler('?'+this.queryString, this.props);

        }
    }

    componentWillMount() {
        if (this.props.filters) {
            var submit__text = this.Localization('submit', this.props.language);
            var dropdowns;
            var value;
            var options = [];

            /* Build filter options*/
            for (var i = 0; i < this.props.filters.length; i++) {

                // If single-choice selection, such as textboxes etc.
                if (this.props.filters[i].group && !(this.props.filters[i].group instanceof Array)) {

                    switch(this.props.filters[i].group.params) {
                        case 'year':
                            value = Moment().year();
                            break;
                        case 'week':
                            value = Moment().week();
                            break;
                    }
                    this.filter.push(
                        <input className="filter"
                            key={i} type="text"
                            placeholder={this.props.filters[i].group.displayName}
                            defaultValue={value}
                            name={this.props.filters[i].group.params}
                            params={this.props.filters[i].group.params}/>);
                } else {
                    // Handle multiple choice options
                    this.filter.push(
                        <select key={i} id={i} defaultValue={this.selectedValue} className="filter dropdown">
                            <Options key={i} options={this.props.filters[i].group}/>
                        </select>
                    );
                }
            }

            /* Submit button */
            if (this.props.filters.length) {
                this.submitButton = (<input type="submit" className="tag tag--submit" value={submit__text} onClick={this.filterTable}/>);
            }

            this.setState({
                all: true,
                filters: this.filters
            });
        }
    }

    render() {
        if (this.props.companies && this.props.companies.results) {
            this.companyList = this.props.companies.results.map(function(item, key) {
                if (item.name) {
                    return (<option key={key} value={item.name} id={key}>{item.name}</option>);
                }
            }, this);
        }

        return(
            <div id={'filter--'+this.props.id} className="tag__wrapper col-12">
                <form method="GET">
                    {this.filter}
                    {this.submitButton}
                </form>
            </div>
        );
    }
}

export class Options extends Component {
    render() {
        var options = [];
        for (var j in this.props.options) {
            options.push(<option key={j+1} value={this.props.options[j].params}>{this.props.options[j].displayName}</option>);
        }
        return options;
    }
}
