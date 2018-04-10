global.AccountsReceivable = {
    widgets : [{
        /***************
        ** WIDGET 1
        ** Toolbox
        ****************/
        name: 'ToolBox', // Must match an existing React Component in the components/widgets folder.
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_TOOLBOX
    },{
        /***************
        ** WIDGET 2
        ** Summary
        ****************/
        name: 'DataTable', // Must match an existing React Component in the components/widgets folder.
        title: '', // You can specify a translatable text here if the value matches an item in global.languages.js
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE,
        bootStrapClass : 'col-12', // BootStrap grid class for the widget

        /*
         * Data Filters
         * Flexible client-side filtering for the results retrieved from the DataBase.
        **/
        filters: [{

            /* Dropdown group 1 */
            /* If group is an Array of objects, the filter is a dropdown.
             * Each array position represents an item in the dropdown list.
             *
             * OPTIONS
             * displayName: The name as it will appear on the form item.
             * params: The parameters for the filter in Query String format.
             * [customColumns]: Specify these if the search results should render specific columns.
            **/
            group: [{
                displayName: 'With Balance',
                params: 'balance=withbalance'
            }, {
                displayName: 'All',
                params: 'balance=all'
             }]
        }],

        /*
         * Default columns to show on the Table.
         * Shows when page loads the first time or if no custom columns are
         * specified on each filter option.
         *
         * OPTIONS
         * name: Column name as retrieved from the WS. The name must be an exact match.
         * [width]: The width for the specific column.
         * [type]: Specify the data type for the DataFormatter function (global.helpers.js)
         * [align]: Specify if the column's content should align left, center, or right.
         * [displayName]: Customizable column name to display on the Table Header.
        **/
        defaultColumns: [
            { name: 'custNo', width: 20, displayName: '#', type: 'accountsReceivablePopUp'},
            { name: 'custName', width: 50, displayName: 'customerName' },
            { name: 'phoneNo', width: 30, align: 'right', displayName: 'phoneNo' },
            { name: 'amountDue', width: 30, align: 'right', type: 'currency', displayName: 'amountDue' },
            { name: 'agedAt', width: 30, align: 'center', displayName: 'agedAt'},
            { name: 'lastPayment', width: 30, align: 'center', displayName: 'lastPayment'},
            { name: 'thisPayment', width: 40, align: 'center', type: 'currency', displayName: 'thisPayment' },
            { name: 'address', width: 35 },
            { name: 'city', width: 30 },
            { name: 'province', width: 35, align: 'center' }],
        options: {
            sizePerPageList: [ {
            text: '25', value: 25
            }, {
            text: '50', value: 50
            }, {
            text: '500', value: 500
            }],
            sizePerPage: 25
        }
    }, {
        /***************
        ** WIDGET 3
        ** Collection
        ****************/
        name: 'DataTable', // Must match an existing React Component in the components/widgets folder.
        title: 'Collection', // You can specify a translatable text here if the value matches an item in global.languages.js
        bootStrapClass : 'col-lg-6 col-sm-12',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_COLLECTION,
        defaultColumns: [
            { name: 'actionDate', width: 35 },
            { name: 'name', width: 50, displayName: 'customerName', type: 'accountsReceivablePopUp' },
            { name: 'telNum', width: 35, displayName: 'telephone' },
            { name: 'overdueAmt', width: 40, type: 'currency', display: 'overdueAmt' },
            { name: 'balanceDue', width: 40, type: 'currency' },
            { name: 'lastPaymentDate', width: 40, displayName: 'lastPayment' }],
        options: {}
    },{
        name: 'DataChart', // Must match an existing React Component in the components/widgets folder.
        title: 'Analysis', // Optional. The widget's title
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_ARAGEING, // The data endpoint
        bootStrapClass : 'col-lg-6 col-sm-12', // BootStrap grid class for the widget
        overrideBootStrapClass : 'col-12', // In case you need to override the previous class.
        label: 'Analysis', // Some chart types only offer one label (bar, line, and radar )
        type: 'pie', // Type of pie chart to display. Options listed here: https://github.com/houjiazong/react-chartjs2
        groupBy: { name: 'desc'}, // The field used to group the elements in the chart together
        calculateBy: { name: 'total', type: 'currency'}, // The field used to calculate the percentage of each group
        topElems: 5, // Show this many number of individual elements, group the rest under "Other" category
        showChartDetails: false, // Display percentages next to the graphic chart
        buildTable: true, // Show data table with more detailed breakdown
        hideTitleInTable: true, // Hide the title that comes with DataTable widget.
        tableWrapperClass : 'wrapper--noWrapper', // Helps remove margins and paddings from DataTable widget.

        /*
         * Default columns to show on the Table.
         * Shows when page loads the first time or if no custom columns are
         * specified on each filter option.
         *
         * OPTIONS
         * name: Column name as retrieved from the WS. The name must be an exact match.
         * [width]: The width for the specific column.
         * [type]: Specify the data type for the DataFormatter function (global.helpers.js)
         * [align]: Specify if the column's content should align left, center, or right.
         * [displayName]: Customizable column name to display on the Table Header.
        **/
        defaultColumns: [ // Show these columns first time the widget loads or if no customColumns are specified
            {name: 'period1', width: 50, type: 'currency', align: 'right'},
            {name: 'desc', width: 50, align: 'left', type: 'link'},
            {name: 'total', width: 30, type: 'currency', align: 'right'}],

        /*
         * Data Filters
         * Flexible client-side filtering for the results retrieved from the DataBase.
        **/
        filters: [{
            /* Dropdown group 1 */
            /* If group is an Array of objects, the filter is a dropdown.
             * Each array position represents an item in the dropdown list.
             *
             * OPTIONS
             * displayName: The name as it will appear on the form item.
             * params: The parameters for the filter in Query String format.
             * [customChart]: Allow each search combination to render a different chart.
             * [customColumns]: Specify these if the search results should render specific columns.
            **/
            group: [{
                displayName: 'Branch/Division',
                params: 'branch=branch',
                customChart: {type: 'bar', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'code', width: 20, align: 'center'},
                    {name: 'desc', width: 30 },
                    {name: 'current', width: 30, type: 'currency' },
                    {name: 'period1', width: 30, type: 'currency' },
                    {name: 'period2', width: 30, type: 'currency' },
                    {name: 'period3', width: 30, type: 'currency' },
                    {name: 'period4', width: 30, type: 'currency' }]
            }, {
                displayName: 'Salesman',
                params: 'branch=salesman',
                customChart: {type: 'bar', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'code', width: 20, align: 'center'},
                    {name: 'desc', width: 30 },
                    {name: 'current', width: 30, type: 'currency' },
                    {name: 'period1', width: 30, type: 'currency' },
                    {name: 'period2', width: 30, type: 'currency' },
                    {name: 'period3', width: 30, type: 'currency' },
                    {name: 'period4', width: 30, type: 'currency' }]
            }, {
                displayName: 'Territory',
                params: 'branch=territory',
                customChart: {type: 'pie', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'code', width: 20, align: 'center'},
                    {name: 'desc', width: 30 },
                    {name: 'current', width: 30, type: 'currency' },
                    {name: 'period1', width: 30, type: 'currency' },
                    {name: 'period2', width: 30, type: 'currency' },
                    {name: 'period3', width: 30, type: 'currency' },
                    {name: 'period4', width: 30, type: 'currency' }]
            }, {
                displayName: 'Customer Type',
                params: 'branch=type',
                customChart: {type: 'pie', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'code', width: 20, align: 'center'},
                    {name: 'desc', width: 30 },
                    {name: 'current', width: 30, type: 'currency' },
                    {name: 'period1', width: 30, type: 'currency' },
                    {name: 'period2', width: 30, type: 'currency' },
                    {name: 'period3', width: 30, type: 'currency' },
                    {name: 'period4', width: 30, type: 'currency' }]
            }, {
                displayName: 'Ageing Code',
                params: 'branch=ageing',
                customChart: {type: 'bar', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'code', width: 20, align: 'center'},
                    {name: 'desc', width: 30 },
                    {name: 'current', width: 30, type: 'currency' },
                    {name: 'period1', width: 30, type: 'currency' },
                    {name: 'period2', width: 30, type: 'currency' },
                    {name: 'period3', width: 30, type: 'currency' },
                    {name: 'period4', width: 30, type: 'currency' }]
            }]
        }, {
            /* Dropdown group 2 */
            group: [{
                displayName: 'Total Receivables',
                params: 'by=total'
            }, {
                displayName: 'Receivables by Period',
                params: 'by=period'
            }]
        }]
    },
     {
         /***************
         ** WIDGET 4
         ** Sliding Toolbox
         ****************/
        name: 'SlidingToolBox', // Must match an existing React Component in the components/widgets folder.
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_SLIDING
    }
]};
