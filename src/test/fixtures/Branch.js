const Branch = {};
Branch.branchDetail = () => {
    const branchDetailFound = {
        status: 200,
        message: 'Fetched kitchen details.',
        body: {
            id: 1,
            name: 'Gallus',
            date: 'Tuesday Apr 22st',
            supportNumber: '+92308768755',
        },
    };
    return branchDetailFound;
};
Branch.invalidBranchId = () => {
    const invalidBranchId = {
        status: 400,
        message: 'Invalid request.',
    };
    return invalidBranchId;
};
Branch.POSDrivers = () => {
    const posDrivers = [
        {
            driverId: 1,
            driverName: 'Tony',
            driverPhone: '+97155672321',
        },
    ];

    return posDrivers;
};
Branch.POSDriversListFromDB = () => {
    const driversList = [
        {
            id: 1,
            name: 'Tony',
            phone: '+97155672322',
        },
    ];
    return driversList;
};
Branch.getBranchServiceFunctionNames = () => {
    const functionsNames = ['fetchBranchDetails', 'fetchBranchTimings', 'getBranchDrivers', 'fetchBranchStats', 'createOrAssignDriver'];
    return functionsNames;
};

export default Branch;
