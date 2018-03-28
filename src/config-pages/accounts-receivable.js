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
        name: 'DataChart',
        title: 'Analysis',
        endpoint: global.endpoints[global.env].ACCOUNTS_RECEIVABLE_ARAGEING,
        bootStrapClass : 'col-lg-6 col-sm-12',
        type: 'bar',
        groupBy: 'desc',
        calculateBy: 'total',
        label: 'Analysis',
        buildTable: false,
        formatTableData: { name: 'total', type: 'currency'},
        filters: [{
            /*Dropdown group 1*/
            group: [{
                displayName: 'Branch/Division',
                params: 'branch=branch',
                customColumns: [{type: 'bar', aggregateBy: '', calculateBy: ''}]
            }, {
                displayName: 'Salesman',
                params: 'branch=salesman',
                customColumns: [{type: 'bar', aggregateBy: '', calculateBy: ''}]
            }, {
                displayName: 'Territory',
                params: 'branch=territory',
                customColumns: [{type: 'bar', aggregateBy: '', calculateBy: ''}]
            }, {
                displayName: 'Customer Type',
                params: 'branch=type',
                customColumns: [{type: 'bar', aggregateBy: '', calculateBy: ''}]
            }, {
                displayName: 'Ageing Code',
                params: 'branch=ageing',
                customColumns: [{type: 'bar', aggregateBy: '', calculateBy: ''}]
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
