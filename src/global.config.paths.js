global.paths = {
    dev: {
        BASE_URL: '/',
        REACT_LINK: '/commonsense/react/',
        SERVLET_LINK: '/commonsense/react/',
        DASHBOARD: 'dashboard/',
        BUILD_ROUTE: 'commonsense/react/'
    },

    prod: {
        BASE_URL: '/commonsense/',
        REACT_LINK: '/commonsense/react/',
        SERVLET_LINK: '/commonsense/servlet/',
        DASHBOARD: 'dashboard/',
        BUILD_ROUTE: 'react/'
    }
};

global.endpoints  = {
    dev: {
        AUTH: '',
        SESSION: '/webservices/Session.json',
        COMPANIES: '/webservices/Companies.json',
        ACCORDION: '/webservices/FullMenu.json',
        ACCOUNTS_PAYABLE: '/webservices/AccountsPayable.json',
        ACCOUNTS_PAYABLE_CASH_DISBURSEMENT: '/webservices/AccountsPayableCashDisbursement.json',
        ACCOUNTS_PAYABLE_SUMMARY: '/webservices/AccountsPayableSummary.json',
        ACCOUNTS_PAYABLE_TOOLBOX: '/webservices/AccountsPayableToolbox.json',
        ACCOUNTS_PAYABLE_SLIDING: '/webservices/AccountsPayableSlidingToolBox.json',
        PAYROLL: '/webservices/AccountsPayable.json',
        PAYROLL_SUMMARY: '/webservices/AccountsPayableSummary.json',
        PAYROLL_SLIDING: '/webservices/AccountsPayableSlidingToolBox.json',
        ACCOUNTS_RECEIVABLE_TOOLBOX: '/webservices/AccountsReceivableToolbox.json',
        ACCOUNTS_RECEIVABLE_SLIDING: '/webservices/AccountsReceivableSlidingToolBox.json',
        ACCOUNTS_RECEIVABLE : '/webservices/AccountsReceivable.json',
        ACCOUNTS_RECEIVABLE_COLLECTION: '/webservices/AccountsReceivableCollection.json',
        ACCOUNTS_RECEIVABLE_ARAGEING: '/webservices/AccountsReceivableArageing.json'
    },

    prod: {
        AUTH: '/commonsense/services/user/authentication/login',
        SESSION: '/commonsense/services/user/session',
        COMPANIES: '/commonsense/services/user/portal/companies',
        ACCORDION: '/commonsense/services/user/portal/menu',
        ACCOUNTS_PAYABLE: '/commonsense/services/finance/accounts-payable',
        ACCOUNTS_PAYABLE_CASH_DISBURSEMENT: '/commonsense/services/finance/accounts-payable/cash-disbursement',
        ACCOUNTS_PAYABLE_SUMMARY: '/commonsense/services/finance/accounts-payable/summary',
        ACCOUNTS_PAYABLE_TOOLBOX: '/commonsense/react/webservices/AccountsPayableToolbox.json',
        ACCOUNTS_PAYABLE_SLIDING: '/commonsense/react/webservices/AccountsPayableSlidingToolBox.json',
        PAYROLL: '/commonsense/services/finance/accounts-payable',
        PAYROLL_SUMMARY: '/commonsense/services/finance/accounts-payable/summary',
        PAYROLL_SLIDING: '/commonsense/react/webservices/AccountsPayableSlidingToolBox.json',
        ACCOUNTS_RECEIVABLE_TOOLBOX: '/commonsense/react/webservices/AccountsReceivableToolbox.json',
        ACCOUNTS_RECEIVABLE_SLIDING: '/commonsense/react/webservices/AccountsReceivableSlidingToolBox.json',
        ACCOUNTS_RECEIVABLE : '/commonsense/services/finance/accounts-receivable',
        ACCOUNTS_RECEIVABLE_COLLECTION: '/commonsense/services/finance/accounts-receivable/collection-list',
        ACCOUNTS_RECEIVABLE_ARAGEING: '/commonsense/services/finance/accounts-receivable/arageing-list'
    }
};
