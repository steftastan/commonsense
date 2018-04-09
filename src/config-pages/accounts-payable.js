global.AccountsPayable = {
    widgets : [{
        /***************
        ** WIDGET 1
        ** Toolbox
        ****************/
        name: 'ToolBox', // Must match an existing React Component in the components/widgets folder.
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_TOOLBOX
    }, {
        /***************
        ** WIDGET 2
        ** Summary
        ****************/
        name: 'DataTable', // Must match an existing React Component in the components/widgets folder.
        title: 'accountsPayable', // You can specify a translatable text here if the value matches an item in global.languages.js
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE,
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
                displayName: 'Cheques',
                params: 'cheques=cheques',
                customColumns: [
                    {name: 'supNum', width: 50, displayName: '#'},
                    {name: 'name', width: 60, type: 'link', displayName: 'supplier'},
                    {name: 'address', width: 50},
                    {name: 'city', width: 30, align: 'center'},
                    {name: 'province', width: 30, align: 'center'},
                    {name: 'telephone', width: 30, align: 'center'},
                    {name: 'balance', width: 30, type: 'currency', align: 'right', displayName: 'balanceDue'},
                    {name: 'lastInvoiceDate', width: 40, align: 'center',  displayName: 'lastInvoice'},
                    {name: 'lastCheckDate', width: 35, align: 'center', displayName: 'lastCheque'},
                    {name: 'currPeriodAMT', width: 40, type: 'currency', align: 'right',  displayName: 'currentPer'}]
            }, {
                displayName: 'Purchases',
                params: 'cheques=purchases',
                customColumns: [
                    {name: 'supNum', width: 30, type: 'id'},
                    {name: 'name', width: 60, type: 'link', displayName: 'supplier'},
                    {name: 'address', width: 50, align: 'left'},
                    {name: 'city', width: 30, align: 'center'},
                    {name: 'province', width: 30, align: 'center'},
                    {name: 'telephone', width: 30, align: 'center'},
                    {name: 'balance',width: 30, type: 'currency', align: 'left'},
                    {name: 'lastInvoiceDate', width: 40, align: 'center'},
                    {name: 'ytdamount', width: 30, type: 'currency', align: 'right', displayName: "ytdAmount"},
                    {name: 'currPeriodAMT', width: 40, type: 'currency', align: 'right', displayName: "currentPer" }],
            }]
        }, {
            /* Dropdown group 2 */
            group: [{
                displayName: 'Balances',
                params: 'balance=balance'
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
            {name: 'supNum', width: 20, displayName: 'number'},
            {name: 'name', width: 60, type: 'dataTablePopUp', displayName: 'supplier'},
            {name: 'address', width: 50},
            {name: 'city', width: 30, align: 'center'},
            {name: 'province', width: 30, align: 'center'},
            {name: 'telephone', width: 30, align: 'center'},
            {name: 'balance', width: 30, type: 'currency', align: 'right', displayName: 'balanceDue'},
            {name: 'lastInvoiceDate', width: 40, align: 'center',  displayName: 'lastInvoice'},
            {name: 'lastCheckDate', width: 35, align: 'center', displayName: 'lastCheque'},
            {name: 'currPeriodAMT', width: 40, type: 'currency', align: 'right',  displayName: 'currentPer'}],

        /* Optional. Allows you to override the widget's default configuration */
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
        ** Cash Disbursement
        ****************/
        name: 'DataTable', // Must match an existing React Component in the components/widgets folder.
        title: 'cashDisbursement', // You can specify a translatable text here if the value matches an item in global.languages.js
        bootStrapClass : 'col-lg-6 col-sm-12', // BootStrap grid class for the widget
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,

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
            {name: 'name', width: 60, displayName: 'supplier'},
            {name: 'location', width: 50, align: 'center', displayName: 'loc'},
            {name: 'currentWeek', width: 50, align: 'right', displayName: 'currentWeek'},
            {name: 'totalDue', width: 40, type: 'currency', align: 'right',  displayName: 'totalDue'},
            {name: 'currency', width: 50, align: 'center'},
            {name: 'type', width: 50, align: 'center'}],

        /*
         * Data Filters
         * Flexible client-side filtering for the results retrieved from the DataBase.
        **/
        filters: [{
            /* If group is an Object, the filter is a text box.
             *
             * OPTIONS
             * name: Column name as retrieved from the WS. The name must be an exact match.
             * [width]: The width for the specific column.
             * [type]: Specify the data type for the DataFormatter function (global.helpers.js)
             * [align]: Specify if the column's content should align left, center, or right.
             * [displayName]: Customizable column name to display on the Table Header.
            **/
            group: {
                displayName: 'year',
                params: 'year'
            }
        }, {
            /* Text filter by Week */
            group: {
                displayName: 'week',
                params: 'week'
            }
        }]
    }, {
        /***************
        ** WIDGET 4
        ** Data Chart
        ****************/
        name: 'DataChart', // Must match an existing React Component in the components/widgets folder.
        title: 'analysis', // You can specify a translatable text here if the value matches an item in global.languages.js
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
        bootStrapClass : 'col-lg-6 col-sm-12',  // BootStrap grid class for the widget
        label: 'analysis', // Some chart types only offer one label (bar, line, and radar )
        type: 'bar', // Type of pie chart to display. Options listed here: https://github.com/houjiazong/react-chartjs2
        groupBy: { name: 'type'}, // The field used to group the elements in the chart together
        calculateBy:  { name: 'totalDue', type: 'currency'}, // The field used to calculate the percentage of each group
        topElems: 5, // Show this many number of individual elements, group the rest under "Other" category
        showChartDetails: true, // Display percentages next to the graphic chart
        buildTable: false  // Show data table with more detailed breakdown
    }, {
        /***************
        ** WIDGET 5
        ** Data Chart
        ****************/
        name: 'SlidingToolBox', // Must match an existing React Component in the components/widgets folder.
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_SLIDING
    }
]};
