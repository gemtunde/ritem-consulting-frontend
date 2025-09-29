const contactUs = {
  name: 'contactUs',
  title: 'Contact Us',
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
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'details',
              title: 'Contact Details',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'details',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title,
                subtitle: subtitle ? subtitle.join(', ') : 'No details',
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'pageSubtitle',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Contact Us',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
};

export default contactUs;