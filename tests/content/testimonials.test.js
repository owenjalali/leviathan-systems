import assert from 'node:assert/strict'
import test from 'node:test'

import { testimonials } from '../../src/content/demo-data.js'

test('Alister D Souza testimonial is the third testimonial', () => {
  const testimonial = testimonials[2]

  assert.equal(testimonial.name, "Alister D'Souza")
  assert.equal(testimonial.role, 'Owner')
  assert.equal(testimonial.business, 'JAT Home Solutions')
  assert.equal(
    testimonial.quote,
    "Working with Leviathan has been a crucial step to my company's success. They took full control of my online interface and made it as simple and straightforward on my end as possible. Now I can focus on business operations instead of chasing leads.",
  )
})
