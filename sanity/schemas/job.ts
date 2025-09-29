const jobSchema = {
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'England', value: 'England' },
          { title: 'Scotland', value: 'Scotland' },
          { title: 'Wales', value: 'Wales' },
          { title: 'Northern Ireland', value: 'Northern Ireland' },
          { title: 'Ireland', value: 'Ireland' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          'Technology',
          'Healthcare',
          'Financial Services',
          'Marketing',
          'Education',
          'Manufacturing',
          'Retail',
          'Consulting',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contractType',
      title: 'Contract Type',
      type: 'string',
      options: {
        list: ['Permanent', 'Contract', 'Temporary', 'Part-time'],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: [
          'Frontend Developer',
          'Backend Developer',
          'Full Stack Developer',
          'HR Specialist',
          'Doctor',
          'Nurse',
          'Marketing Specialist',
          'Data Analyst',
          'Project Manager',
          'Designer',
          'Sales Representative',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'salary',
      title: 'Salary',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'postedDate',
      title: 'Posted Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'closingDate',
      title: 'Closing Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isUrgent',
      title: 'Urgent Position',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
    },
    {
      name: 'teamSize',
      title: 'Team Size',
      type: 'string',
    },
    {
      name: 'reportingTo',
      title: 'Reporting To',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Posted Date (Newest First)',
      name: 'postedDateDesc',
      by: [{ field: 'postedDate', direction: 'desc' }],
    },
  ],
};

export default jobSchema;