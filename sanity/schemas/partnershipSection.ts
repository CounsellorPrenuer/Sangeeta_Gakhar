// @ts-nocheck - Example file for reference, will work when copied to actual project with Sanity installed
import { defineType, defineField } from 'sanity'

/**
 * PARTNERSHIP SECTION
 * Explains the Over-Simplify × Mentoria collaboration
 */
export const partnershipSection = defineType({
  name: 'partnershipSection',
  title: 'Partnership Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Partnership Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text explaining the partnership',
    }),
    defineField({
      name: 'mentoriaLogo',
      title: 'Mentoria Logo',
      type: 'image',
    }),
    defineField({
      name: 'oversimplifyLogo',
      title: 'Over-Simplify Logo',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: 'Partnership Section',
        subtitle: title,
      }
    },
  },
})
