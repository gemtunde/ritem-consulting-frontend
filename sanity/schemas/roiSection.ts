const roiSection = {
  name: 'roiSection',
  title: 'ROI Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'ROI Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'The metric value (e.g., "85%", "$2.5M", "300+")',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'Short label for the metric (e.g., "Cost Reduction", "Revenue Increase")',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
              description: 'Detailed description of what this metric represents',
            },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
              description: 'description',
            },
            prepare(selection: any) {
              const { value, label, description } = selection;
              return {
                title: `${value} - ${label}`,
                subtitle: description ? `${description.substring(0, 60)}...` : 'No description',
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(6),
      description: 'Add up to 6 ROI metrics to display',
    },
  ],
  preview: {
    select: {
      title: 'title',
      metricsCount: 'metrics',
    },
    prepare(selection: any) {
      const { title, metricsCount } = selection;
      const count = metricsCount ? metricsCount.length : 0;
      return {
        title: title || 'ROI Section',
        subtitle: `${count} metric${count !== 1 ? 's' : ''} configured`,
      };
    },
  },
};

export default roiSection;