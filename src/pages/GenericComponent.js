import './../global.config.env.js';
import './../global.polyfills.js';
import $ from 'jquery';
import React, { Component } from 'react';
import { GetWidget, ObjectToArray } from './../global.helpers.js';
import { BreadCrumbs } from './../components/layout/breadcrumbs.js';
import { Filter } from './../components/widgets/Filter.js';

/** ACCOUNTS PAYABLE
 *
 * Options config object
 * @param widgets {Array} Array of objects for each widget that needs to be displayed.
 *
 * Key/Value options available for the widget variable.
 *** @param endpoint {String} the URL to Web Service where data for that table can be fetched.
 *** @param bootStrapClass {String} the bootstrap grid class to allow our table to be responsive.
 ***    col-12: Makes a full-width table
 ***    col-lg-6 col-sm-12: Makes a half-width table on desktop and full width on mobile.
 ***    Any bootstrap style grids apply. Check their documentation for all options.
 ***    https://getbootstrap.com/docs/4.0/layout/grid/
 *** @param options {Object} This optional parameter allows to override default options for the widget.
 *** More information on what data can be passed via table options is available at src/components/modules/datatable.js

 *
 * NOTE: The link below is a fun read about passing data from children components to their parents:
 * https://gist.github.com/sebkouba/a5ac75153ef8d8827b98
 *
 */

export class GenericComponent extends Component {

    constructor(props) {
      super(props);
      this.GetWidget = GetWidget;
      this.filterHandler = this.filterHandler.bind(this);
      this.toolBox = [];
      this.widgets = [];
      this.data = [];
      this.state = {
          widgets: [],
          loaded: false,
          updatedFilter: false,
          filters: '',
          component : null
      };
    }

    /* This function is passed as a prop to the submit button in the filter widget,
     * so we update the state every time we perform a new search. */
    filterHandler(param, comp) {
        /* TODO remove the extra state cahange by putting if clause from ln 75 here except that breaks otehr stuff */
        this.setState({filters: param, component: comp});
    }

    /**
     * Setting this flag to true allows the component to begin loading the components.
     */
    componentDidMount() {
        this.setState({loaded:true});
    }

    /**
     * Perform all ajax tasks here
     * Maybe update the state. in any case the widgets should render and data should be applied on componentDidUpdate
     */

     componentDidUpdate(prevProps, prevState) {
       var data = {};
       var result = {};
       var filters;

       /**
        * Update the corresponding widget
        */
        if (prevState.filters !== this.state.filters) {

            if (this.props.options.widgets[this.state.component]) {
                // push the query string to the URL without refreshing
                this.props.history.push(this.props.location.pathname+this.state.filters);

                // update the widget whose data we're filtering
                this.GetWidget(this.state.component, this.props.options.widgets[this.state.component], this.state.filters, function(key, response, widget) {
                    var tempWidgets = [];
                    var newWidget = {};
                    var componentName = widget.name;
                    var Component = require('./../components/widgets/'+componentName+'.js').default;

                    newWidget = (<Component
                        index={key}
                        key={key}
                        active={this.state.component}
                        options={widget}
                        results={response.results}
                        search={this.state.filters}
                        filters={widget.filters || []}
                        dbFilters={response.filters || []}
                        filterHandler={this.filterHandler}
                        language={this.props.language} />);

                    tempWidgets = [...this.state.widgets];
                    tempWidgets[this.state.component] = {...newWidget, key: this.state.component.toString()};

                    this.setState({updatedFilter:true, widgets: tempWidgets});

                }.bind(this));
            }
        }

       if (prevState.loaded !== this.state.loaded) {

           /* Include query string if present in URL */
           for (var i = 0; i < this.props.options.widgets.length; i++) {
               this.GetWidget(i, this.props.options.widgets[i], filters, function(key, response, widget) {
                   if (response) {
                       var componentName = widget.name;
                       if (componentName) {
                           var Component = require('./../components/widgets/'+componentName+'.js').default;

                           /**
                           * Decide which components to display based on what was established in the options object.
                           */

                           this.widgets.push(
                               <Component
                                   index={key}
                                   key={key}
                                   options={widget}
                                   results={response.results}
                                   search={this.props.location.search}
                                   filters={widget.filters || []}
                                   dbFilters={response.filters || []}
                                   filterHandler={this.filterHandler}
                                   language={this.props.language} />);
                       }
                    }

                /* Sort widgets by order their in the config object. */
                this.widgets.sort(function(a, b) {return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);} );

                /*
                 * Saving the widget's to the component's state allows
                 * us to trigger a component re-render so we can replace
                 * the loading icon with our data.
                 */
                this.setState({widgets: this.widgets});
                }.bind(this));
            }
        }
     }

    render() {
        var content = (this.state.widgets && this.state.widgets.length ? <div>{this.state.widgets}</div> : <div className="spinner"></div>);
        return (
            <div>
                <BreadCrumbs breadcrumbs={this.props.page} language={this.props.language}>
                    <div id="toolBoxHolder" className="toolBoxHolder"></div>
                </BreadCrumbs>
                {content}
            </div>
        );
    }
};

export default GenericComponent;
