global.AccountsPayable = {
    widgets : [{
        /***************
         * Toolbox
         ***************/
        name: 'ToolBox',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_TOOLBOX
    }, {
        /***************
         * Summary
         ***************/
        name: 'DataTable',
        title: 'Accounts Payable',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE,
        bootStrapClass : 'col-lg-6 col-sm-12',

        filters: [{
            /*Dropdown group 1*/
            group: [{
                displayName: 'Cheques',
                params: 'cheques=cheques',
                customColumns: [
                    {name: 'supNum', width: 50, type: 'id'},
                    {name: 'name', width: 60, type: 'link', align: 'left'},
                    {name: 'address', width: 50, align: 'left'},
                    {name: 'city', width: 30, align: 'center'},
                    {name: 'province', width: 30, align: 'center'},
                    {name: 'telephone', width: 30, align: 'center'},
                    {name: 'balance',width: 30, type: 'currency', align: 'left'},
                    {name: 'lastInvoiceDate', width: 40, align: 'center'},
                    {name: 'lastCheckDate', width: 35, align: 'center'},
                    {name: 'currPeriodAMT', width: 40, type: 'currency', align: 'right' }]
            }, {
                displayName: 'Purchases',
                params: 'cheques=purchases',
                customColumns: [
                    {name: 'supNum', width: 50, type: 'id'},
                    {name: 'name',  type: 'link', width: 60},
                    {name: 'address', width: 50},
                    {name: 'city', width: 30},
                    {name: 'province', width: 30, align: 'center'},
                    {name: 'telephone', width: 30},
                    {name: 'balance',width: 30, type: 'currency'},
                    {name: 'lastInvoiceDate', width: 40},
                    {name: 'ytdamount', width: 35},
                    {name: 'currPeriodAMT', width: 40, type: 'currency' }]
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

        defaultColumns: [
            {name: 'name', width: 60, type: 'link'},
            {name: 'address', width: 50},
            {name: 'city', width: 30, align: 'center'},
            {name: 'province', width: 30, align: 'center'},
            {name: 'telephone', width: 30},
            {name: 'balance', width: 30, type: 'currency', align: 'right'}],
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

        /***************
         * Cash Disbursement
         ***************/
        name: 'DataTable',
        title: 'cashDisbursement',
        bootStrapClass : 'col-lg-6 col-sm-12',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
        filters: [{
            /* Text filter by Year */
            group: {
                displayName: 'Year',
                params: 'year'
            }
        }, {
            /* Text filter by Week */
            group: {
                displayName: 'Week',
                params: 'week'
            }
        }],
        defaultColumns: [{
                name: 'name',
                width: 75,
                align: 'center'
            }, {
                name: 'location',
                width: 40
            }, {
                name: 'currentWeek',
                width: 50
            }, {
                name: 'currency',
                width: 50
            }, {
                name: 'type',
                width: 40
            }],
        options: {}
    }, {
        name: 'DataChart',
        title: 'accountsPayableChart',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
        bootStrapClass : 'col-lg-6 col-sm-12',
        type: 'pie',
        aggregateBy: 'type',
        calculateBy: 'totalDue',
        label: 'accountsPayableChart',
        buildTable: true,
        defaultParams: 'balance=withbalance&selAll=All&paymentFlag=payment&displayGraphe=false',
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
        }, {
            /* Dropdown group 3 */
            group: [{
                displayName: '1',
                params: 'ageing=1'
            }, {
                displayName: '2',
                params: 'ageing=2'
            }, {
                displayName: '3',
                params: 'ageing=3'
            }, {
                displayName: '4',
                params: 'ageing=4'
            }, {
                displayName: '5',
                params: 'ageing=5'
            }]
        }],

        formatTableData: { name: 'totalDue', type: 'currency'},
    }, {
        name: 'SlidingToolBox',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_SLIDING
    }
]};
