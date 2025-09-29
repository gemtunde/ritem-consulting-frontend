const carouselSection = {
  name: 'carouselSection',
  title: 'Companies Carousel',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      companyCount: 'companies',
    },
    prepare(selection: any) {
      const { title, companyCount } = selection;
      return {
        title: title || 'Companies Carousel',
        subtitle: companyCount ? `${companyCount.length} companies` : 'No companies',
      };
    },
  },
};

export default carouselSection;