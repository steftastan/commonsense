global.AccountsReceivable = {
    widgets : [{
        name: 'ToolBox',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_TOOLBOX
    },{
        name: 'DataTable',
        title: '',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE,
        bootStrapClass : 'col-lg-6 col-sm-12',
        filters: [{
            group: [{
                displayName: 'With Balance',
                params: 'balance=withbalance'
            }, {
                displayName: 'All',
                params: 'balance=all'
             }]
        }],
        defaultColumns: [{
                name: 'custNo',
                width: 60
            }, {
                name: 'custName',
                width: 50
            }, {
                name: 'phoneNo',
                width: 30
            }, {
                name: 'amountDue',
                width: 30,
                type: 'currency'
            }, {
                name: 'agedAt',
                width: 30
            }, {
                name: 'lastPayment',
                width: 30
            }, {
                name: 'thisPayment',
                width: 40,
                type: 'currency'
            }, {
                name: 'address',
                width: 35
            }, {
                name: 'city',
                width: 40
            },{
                name: 'province',
                width: 35
            }],
        bootStrapClass : 'col-12',
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
        name: 'DataTable',
        title: 'Collection',
        bootStrapClass : 'col-lg-6 col-sm-12',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_COLLECTION,
        defaultColumns: [{
                name: 'actionDate',
                width: 75
            }, {
                name: 'name',
                width: 40
            }, {
                name: 'telNum',
                width: 50
            }, {
                name: 'overdueAmt',
                width: 50,
                type: 'currency'
            }, {
                name: 'balanceDue',
                width: 40,
                type: 'currency'
            },{
                name:'lastPaymentDate',
                width: 40
            }],
        options: {}
    },{
        name: 'DataChart', // The widget type, must be CamelCased.
        title: 'Analysis', // The widget's title
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_ARAGEING, // The data endpoint
        bootStrapClass : 'col-lg-6 col-sm-12',
        overrideBootStrapClass : 'col-12', // In case you need to override the previous class.
        label: 'Analysis', // Some chart types only offer one label (bar, line, and radar )
        type: 'pie', // Type of pie chart to display. Options listed here: https://github.com/houjiazong/react-chartjs2
        groupBy: { name: 'desc'}, // The field used to group the elements in the chart together
        calculateBy: { name: 'total', type: 'currency'}, // The field used to calculate the percentage of each group
        topElems: 5, // Show this many number of individual elements, group the rest under "Other" category
        showChartDetails: true, // Display percentages next to the graphic chart
        buildTable: true, // Show data table with more detailed breakdown
        hideTitleInTable: true, // Hide the title that comes with DataTable widget.
        tableWrapperClass : 'wrapper--noWrapper', // Helps remove margins and paddings from DataTable widget.
        defaultColumns: [ // Show these columns first time the widget loads or if no customColumns are specified
            {name: 'period1', width: 50, type: 'currency', align: 'right'},
            {name: 'desc', width: 50, align: 'left', type: 'link'},
            {name: 'total', width: 30, type: 'currency', align: 'right'}],
        filters: [{
            /*Dropdown group 1*/
            group: [{
                displayName: 'Branch/Division',
                params: 'branch=branch',
                customChart: {type: 'bar', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'address', width: 50, align: 'left'},
                    {name: 'code', width: 30, align: 'center'}]
            }, {
                displayName: 'Salesman',
                params: 'branch=salesman',
                customChart: {type: 'doughnut', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'period1', width: 50, align: 'left', type: 'currency' },
                    {name: 'period2', width: 30, align: 'center', type: 'currency' }]
            }, {
                displayName: 'Territory',
                params: 'branch=territory',
                customChart: {type: 'line', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'period1', width: 50, align: 'left', type: 'currency'},
                    {name: 'desc', width: 30, align: 'center'}]
            }, {
                displayName: 'Customer Type',
                params: 'branch=type',
                customChart: {type: 'radar', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'current', width: 50, align: 'left',  type: 'currency' },
                    {name: 'period4', width: 30, align: 'center',  type: 'currency' }]
            }, {
                displayName: 'Ageing Code',
                params: 'branch=ageing',
                customChart: {type: 'polarArea', groupBy: 'desc', calculateBy: 'total'},
                customColumns: [
                    {name: 'period1', width: 50, align: 'left'},
                    {name: 'desc', width: 30, align: 'center'}]
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
        name: 'SlidingToolBox',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_SLIDING
    }
]};
