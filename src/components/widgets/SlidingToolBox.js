import React, { Component } from 'react';
import './../../global.config.env.js';
import { Localization, HandleWebFacingLink, HandlePopupLink, HandleRegularLink} from './../../global.helpers.js';

/**
* SLIDING TOOLBOX COMPONENT.
* Provides an additional navigation box that is collapsible to the right side
* of the screen.
*
*/

export class SlidingToolBox extends Component {
    constructor(props) {
      super(props);
      this.HandleWebFacingLink = HandleWebFacingLink;
      this.HandlePopupLink = HandlePopupLink;
      this.HandleRegularLink = HandleRegularLink;
      this.openToolBox = this.openToolBox.bind(this);
      this.clickAnywhereToClose = this.clickAnywhereToClose.bind(this);
      this.button = 'slidingToolBoxButton';
      this.icon = 'slidingToolBoxIcon';
      this.toolBox = 'slidingToolBoxLinks';
      this.wrench = 'fa-wrench';
      this.close = 'fa-close';
      this.state = {
          open: false,
          openClass: 'slidingToolBox__links--active'
      };
    }

    openToolBox(e) {
        e.stopPropagation();
        var toolBox = document.getElementById(this.toolBox);
        var icon = document.getElementById(this.icon);

        if(this.state.open) {
            this.setState({
                open: false
            });
            toolBox.classList.remove(this.state.openClass);
            icon.classList.add(this.wrench);
            icon.classList.remove(this.close);
        } else {
            this.setState({
                open: true
            });
            toolBox.classList.add(this.state.openClass);
            icon.classList.add(this.close);
            icon.classList.remove(this.wrench);
        }
    }

    clickAnywhereToClose(event) {
        if(this.state.open) {
            this.openToolBox(event);
        }
    }

    /*
     * Add click listening feature to open and close the accordion.
     */
     componentDidMount() {
         var button = document.getElementById(this.button);
         button.addEventListener('mousedown', this.openToolBox, false);
         document.addEventListener('mousedown', this.clickAnywhereToClose, false);
     }

    render() {
        var links;

        if (this.props.results && this.props.results.length) {
            var title__text;
            links = this.props.results.map(function(item, key) {
                var linkOnClick;
                title__text = Localization(item.title);

                if (item.url.indexOf("GatewayServlet") !== -1) {
                    linkOnClick = this.HandleWebFacingLink.bind(this, item.url);
                }
                else if (item.url.indexOf("popup") !== -1) {
                    linkOnClick = this.HandlePopupLink.bind(this, item.url);
                }
                else {
                    linkOnClick = this.HandleRegularLink.bind(this, item.url);
                }

                return (
                    <a key={key} id={key} className="slidingToolBox__item" target="popup" onClick={linkOnClick}>{title__text}</a>
                );
            }, this);
        }

        return (
            <div className="slidingToolBox">
                <div id="slidingToolBoxButton" className="slidingToolBox__button">
                    <div id="slidingToolBoxIcon" className="slidingToolBox__icon fa fa-wrench"></div>
                </div>
                <div id="slidingToolBoxLinks" className="slidingToolBox__links">
                    {links}
                </div>
            </div>

        );
    }
}

export default SlidingToolBox;
