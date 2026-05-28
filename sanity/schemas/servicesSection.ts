// @ts-nocheck - Example file for reference, will work when copied to actual project with Sanity installed
import { defineType, defineField } from 'sanity'

/**
 * SERVICES SECTION
 * Lists services offered (psychometric testing, career counseling, etc.)
 */
export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji or icon name',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }: { title: string }) {
      return {
        title: 'Services Section',
        subtitle: title,
      }
    },
  },
})
