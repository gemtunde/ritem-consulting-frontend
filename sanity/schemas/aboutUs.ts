const aboutUs = {
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'About Us Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'missionTitle',
              title: 'Mission Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'missionDescription',
              title: 'Mission Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'visionTitle',
              title: 'Vision Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'visionDescription',
              title: 'Vision Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'coreValuesTitle',
              title: 'Core Values Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'coreValuesDescription',
              title: 'Core Values Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'missionTitle',
              subtitle: 'visionTitle',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: `Mission: ${title}`,
                subtitle: `Vision: ${subtitle}`,
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
      title: 'description',
      media: 'image',
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title: 'About Us',
        subtitle: title ? `${title.substring(0, 50)}...` : 'No description',
      };
    },
  },
};

export default aboutUs;