const companyStats = {
  name: 'companyStats',
  title: 'Company Statistics',
  type: 'document',
  fields: [
    {
      name: 'companiesTransformed',
      title: 'Companies Transformed',
      type: 'string',
      initialValue: '500+',
    },
    {
      name: 'employeesImpacted',
      title: 'Employees Impacted',
      type: 'string',
      initialValue: '100K+',
    },
    {
      name: 'satisfactionIncrease',
      title: 'Average Satisfaction Increase',
      type: 'string',
      initialValue: '40%',
    },
    {
      name: 'clientRetention',
      title: 'Client Retention Rate',
      type: 'string',
      initialValue: '95%',
    },
  ],
};

export default companyStats;