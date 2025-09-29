const staffRecruitment = {
  name: 'staffRecruitment',
  title: 'Staff Recruitment',
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
      name: 'recruitmentProcess',
      title: 'Recruitment Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Estimated Duration',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: `Step: ${title}`,
                subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : 'No description',
              };
            },
          },
        },
      ],
    },
    {
      name: 'industries',
      title: 'Industries Served',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of industries we recruit for',
    },
    {
      name: 'guaranteePeriod',
      title: 'Placement Guarantee Period',
      type: 'string',
      description: 'e.g., 3 months, 6 months, etc.',
    },
    {
      name: 'successRate',
      title: 'Success Rate',
      type: 'number',
      description: 'Recruitment success rate percentage',
      validation: (Rule: any) => Rule.min(0).max(100),
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
        title: title || 'Staff Recruitment',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
};

export default staffRecruitment;