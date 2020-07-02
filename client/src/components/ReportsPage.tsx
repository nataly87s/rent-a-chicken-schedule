import React from 'react';

export type ReportsPageProps = {
    customerId?: number;
};

const ReportsPage = ({customerId}: ReportsPageProps) => {
    return <>reports page {customerId}</>;
};

export default ReportsPage;
