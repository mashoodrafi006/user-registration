const commissionVariables = {};

commissionVariables.queryStartDate = '2020-01-21';
commissionVariables.queryEndDate = '2020-01-21';
commissionVariables.isStaggeredReturnTrue = { is_commission_staggered: 1 };
commissionVariables.isStaggeredReturnfalse = { is_commission_staggered: 0, lunchon_percentage: 30 };
commissionVariables.isStaggeredTrueResult = { status: true, lunchonPercentage: 0 };
commissionVariables.isStaggeredFalseResult = {
    status: false,
    lunchonPercentage: 30,
};
commissionVariables.percentageOfVat = 0.05;
commissionVariables.amountForVat = 100;
commissionVariables.resultOfUnVattedAmount = 95.23809523809524;
commissionVariables.restoId = 12345;
commissionVariables.adjustmentSum = [{ unvattedPriceSum: 50 }];
commissionVariables.adjustmentSumZero = [];
commissionVariables.event = { event_id: 123, total_price: 100 };
commissionVariables.events = [
    { event_id: 123, total_price: 92 },
    { event_id: 124, total_price: 173 },
];
commissionVariables.eventsTotal = 100;
commissionVariables.eventTotal = 145.23809523809524;
commissionVariables.eventTotalWhenNoAdjustment = 95.23809523809524;
commissionVariables.date = '2020-01-22';
commissionVariables.revenueBasedRestaurants = [{ restaurant_id: 1, sum_of_revenue: 1500 }];
commissionVariables.isStaggeredResult = { status: true, lunchonPercentage: 0 };
commissionVariables.isNotStaggeredResult = { status: false, lunchonPercentage: 10 };
commissionVariables.cateringRevenueForResto = 1000;
commissionVariables.staggeredCommissionValue = 15.0;
commissionVariables.lunchon_percentage = 10;

export default commissionVariables;
