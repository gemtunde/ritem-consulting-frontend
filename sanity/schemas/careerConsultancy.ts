const careerConsultancy = {
  name: 'careerConsultancy',
  title: 'Career Consultancy',
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
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Service Icon',
              type: 'string',
              description: 'Name of the icon (e.g., resume, interview, career)',
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
                title: title,
                subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : 'No description',
              };
            },
          },
        },
      ],
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of key benefits for career consultancy',
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
        title: title || 'Career Consultancy',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
};

export default careerConsultancy;