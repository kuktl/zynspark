/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

export interface WhyReason {
  step: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  region: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  region?: string;
}
