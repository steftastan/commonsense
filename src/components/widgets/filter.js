/* TODO: Move the filter from Data table to here, filters should be accessible for all other widgets */

import React, { Component } from 'react';
import { Localization } from './../../global.helpers.js';
import Moment from 'moment';

export class Filter extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.buildQueryString = this.buildQueryString.bind(this);
      this.filterTable = this.filterTable.bind(this);
      this.currentWeek = '&year='+Moment().year()+'&week='+Moment().week();
      this.companyList = [];
      this.filter = [];
      this.submitButton = [];
      this.queryArray = [];
      this.queryString = '';
      this.dateAdded = false;
    }

    buildQueryString(e) {

        /* Append year and week parameters to query array  */
        if (!this.dateAdded) {
            this.queryArray.push(this.currentWeek);
            this.dateAdded = true;
        }

        this.queryArray.push(e.target.value);

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
        if (this.props.filters) {
            var submit__text = this.Localization('submit', this.props.language);
            var dropdowns;
            var options = [];

            /* Build filter options*/
            for (var i = 0; i < this.props.filters.length; i++) {
                this.filter.push(
                    <select key={i} id={"dropdown"+i} defaultValue={this.selectedValue} onChange={this.buildQueryString} className="filter">
                        <Options key={i} options={this.props.filters[i].dropdown}/>
                    </select>
                );
            }

            /* Submit button */
            if (this.props.filters.length) {
                this.submitButton = (<a className="tag tag--submit" onClick={this.filterTable}>{submit__text}</a>);
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
            <div>
                {this.filter}
                {this.submitButton}
            </div>
        );
    }
}

export class Options extends Component {
    render() {
        var options = [];
        for (var j in this.props.options) {
            if (j == 0) options.push(<option key={j} value={'aaa'}>Select an filter</option>);
            options.push(<option key={j+1} value={this.props.options[j].params}>{this.props.options[j].displayName}</option>);
        }
        return options;
    }
}
