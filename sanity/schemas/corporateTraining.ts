const corporateTraining = {
  name: 'corporateTraining',
  title: 'Corporate Training',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contentTitle',
      title: 'Content Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contentDescription',
      title: 'Content Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Content Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trainingPrograms',
      title: 'Training Programs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'programName',
              title: 'Program Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Program Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., 2 days, 4 weeks, etc.',
            },
            {
              name: 'audience',
              title: 'Target Audience',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'programName',
              subtitle: 'duration',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title,
                subtitle: subtitle || 'No duration specified',
              };
            },
          },
        },
      ],
    },
    {
      name: 'methodologies',
      title: 'Training Methodologies',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of training methodologies used',
    },
    {
      name: 'certification',
      title: 'Certification Offered',
      type: 'boolean',
      description: 'Whether certification is provided after training',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'pageSubtitle',
      media: 'image',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Corporate Training',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
};

export default corporateTraining;