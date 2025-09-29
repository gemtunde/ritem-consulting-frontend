const trustIndicator = {
  name: 'trustIndicator',
  title: 'Trust Indicators',
  type: 'document',
  fields: [
    {
      name: 'companiesCount',
      title: 'Companies Count',
      type: 'string',
      initialValue: '500',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 4.9,
      validation: (Rule: any) => Rule.min(0).max(5),
    },
    {
      name: 'reviewCount',
      title: 'Review Count',
      type: 'string',
      initialValue: '1,200',
    },
    {
      name: 'partnerLogos',
      title: 'Partner Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Company Name', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
          ],
        },
      ],
    },
  ],
};

export default trustIndicator;