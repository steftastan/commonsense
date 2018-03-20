global.AccountsPayable = {
    widgets : [{
        name: 'toolBox',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_TOOLBOX
    }, {
        name: 'dataTable',
        title: 'Accounts Payable',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE,
        bootStrapClass : 'col-lg-6 col-sm-12',

        filters: [{
            /*Dropdown group 1*/
            dropdown: [{
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
            dropdown: [{
                displayName: 'Balances',
                params: 'balance=balance'
            }, {
                displayName: 'All',
                params: 'balance=all'
            }]
        }],

        defaultColumns: [
            {name: 'supNum', width: 50, type: 'id'},
            {name: 'name', width: 60, type: 'link', href: 'http://reddit.com'},
            {name: 'address', width: 50},
            {name: 'city', width: 30},
            {name: 'province', width: 30},
            {name: 'telephone', width: 30},
            {name: 'balance',width: 30, type: 'currency'}],

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
        name: 'dataTable',
        title: 'cashDisbursement',
        bootStrapClass : 'col-lg-6 col-sm-12',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
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
        name: 'dataChart',
        title: 'accountsPayableChart',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_CASH_DISBURSEMENT,
        bootStrapClass : 'col-lg-6 col-sm-12',
        type: 'pie',
        aggregateBy: 'type',
        calculateBy: 'totalDue',
        label: 'accountsPayableChart',
        buildTable: true,
        formatTableData: { name: 'totalDue', type: 'currency'}
    }, {
        name: 'slidingToolbox',
        endpoint: global.endpoints[global.env].ACCOUNTS_PAYABLE_SLIDING
    }
]};
