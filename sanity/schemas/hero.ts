const hero = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started Today',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backgroundShapes',
      title: 'Background Shapes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'shape',
              title: 'Shape Type',
              type: 'string',
              options: {
                list: ['circle', 'square', 'triangle'],
              },
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                { name: 'top', type: 'string' },
                { name: 'left', type: 'string' },
                { name: 'right', type: 'string' },
                { name: 'bottom', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default hero;