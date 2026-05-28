// @ts-nocheck - Example file for reference, will work when copied to actual project with Sanity installed
import { defineType, defineField } from 'sanity'

/**
 * MENTORIA STRENGTHS SECTION
 * Highlights Mentoria's key offerings and credibility
 */
export const mentoriaStrengthsSection = defineType({
  name: 'mentoriaStrengthsSection',
  title: 'Mentoria Strengths Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'strengths',
      title: 'Key Strengths',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Strength Title',
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
              title: 'Icon (emoji or image)',
              type: 'string',
              description: 'Use emoji like 🎓 or upload image',
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
        title: 'Mentoria Strengths',
        subtitle: title,
      }
    },
  },
})
